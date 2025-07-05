<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        $posts = Post::with(['user.profile', 'category', 'tags', 'comments'])
            ->published()
            ->latest()
            ->paginate(10);
            
        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }
    
    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();
        
        return Inertia::render('Posts/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }
    
    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4|max:10240',
            'is_published' => 'boolean',
            'comments_enabled' => 'boolean',
        ]);
        
        $mediaType = null;
        $mediaUrl = null;
        
        if ($request->hasFile('media')) {
            $media = $request->file('media');
            $mediaPath = $media->store('posts', 'public');
            $mediaUrl = Storage::url($mediaPath);
            
            // Determine media type
            $mimeType = $media->getMimeType();
            if (strpos($mimeType, 'image') !== false) {
                $mediaType = 'image';
            } elseif (strpos($mimeType, 'video') !== false) {
                $mediaType = 'video';
            } else {
                $mediaType = 'document';
            }
        }
        
        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'media_type' => $mediaType,
            'media_url' => $mediaUrl,
            'is_published' => $request->is_published ?? true,
            'published_at' => $request->is_published ? now() : null,
            'comments_enabled' => $request->comments_enabled ?? true,
        ]);
        
        if ($request->has('tags')) {
            $post->tags()->attach($request->tags);
        }
        
        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully!');
    }
    
    /**
     * Display the specified post.
     */
    public function show(Post $post)
    {
        // Increment view count
        $post->incrementViewCount();
        
        // Load relationships
        $post->load([
            'user.profile', 
            'category', 
            'tags', 
            'comments.user',
            'likes'
        ]);
        
        // Check if the current user has liked the post
        $userLike = null;
        if (Auth::check()) {
            $userLike = $post->likes()->where('user_id', Auth::id())->first();
        }
        
        return Inertia::render('Posts/Show', [
            'post' => $post,
            'userLike' => $userLike ? true : false,
        ]);
    }
    
    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        
        $categories = Category::all();
        $tags = Tag::all();
        $post->load('tags');
        
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags,
            'postTags' => $post->tags->pluck('id'),
        ]);
    }
    
    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'media' => 'nullable|file|mimes:jpeg,png,jpg,gif,mp4|max:10240',
            'is_published' => 'boolean',
            'comments_enabled' => 'boolean',
        ]);
        
        $mediaType = $post->media_type;
        $mediaUrl = $post->media_url;
        
        if ($request->hasFile('media')) {
            // Delete old media if exists
            if ($post->media_url) {
                $oldPath = str_replace('/storage/', '', $post->media_url);
                Storage::disk('public')->delete($oldPath);
            }
            
            // Store new media
            $media = $request->file('media');
            $mediaPath = $media->store('posts', 'public');
            $mediaUrl = Storage::url($mediaPath);
            
            // Determine media type
            $mimeType = $media->getMimeType();
            if (strpos($mimeType, 'image') !== false) {
                $mediaType = 'image';
            } elseif (strpos($mimeType, 'video') !== false) {
                $mediaType = 'video';
            } else {
                $mediaType = 'document';
            }
        }
        
        // Update publication status
        $wasPublished = $post->is_published;
        $isNowPublished = $request->is_published ?? false;
        
        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'category_id' => $request->category_id,
            'media_type' => $mediaType,
            'media_url' => $mediaUrl,
            'is_published' => $isNowPublished,
            'published_at' => (!$wasPublished && $isNowPublished) ? now() : $post->published_at,
            'comments_enabled' => $request->comments_enabled ?? true,
        ]);
        
        // Sync tags
        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        } else {
            $post->tags()->detach();
        }
        
        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully!');
    }
    
    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        
        // Delete media if exists
        if ($post->media_url) {
            $path = str_replace('/storage/', '', $post->media_url);
            Storage::disk('public')->delete($path);
        }
        
        $post->delete();
        
        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully!');
    }
    
    /**
     * Toggle like status for a post.
     */
    public function toggleLike(Post $post)
    {
        $user = Auth::user();
        $existingLike = $post->likes()->where('user_id', $user->id)->first();
        
        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            $post->likes()->create([
                'user_id' => $user->id
            ]);
            $liked = true;
        }
        
        return response()->json([
            'liked' => $liked,
            'count' => $post->likes()->count()
        ]);
    }
    
    /**
     * Display the user's posts
     */
    public function userPosts()
    {
        $posts = Post::where('user_id', Auth::id())
            ->with(['category', 'tags', 'comments'])
            ->latest()
            ->paginate(10);
            
        return Inertia::render('Posts/UserPosts', [
            'posts' => $posts
        ]);
    }
}
