<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created comment in storage.
     */
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);
        
        $comment = $post->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->content,
            'parent_id' => $request->parent_id,
            'is_approved' => true, // Auto-approve for now, you can change this later
        ]);
        
        // Load the user and other relationships for the comment
        $comment->load('user');
        
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Comment added successfully!',
                'comment' => $comment,
                'comments_count' => $post->comments()->count()
            ]);
        }
        
        return back()->with('success', 'Comment added successfully!');
    }
    
    /**
     * Update the specified comment in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);
        
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);
        
        $comment->update([
            'content' => $request->content,
        ]);
        
        return back()->with('success', 'Comment updated successfully!');
    }
    
    /**
     * Remove the specified comment from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        
        $comment->delete();
        
        return back()->with('success', 'Comment deleted successfully!');
    }
    
    /**
     * Toggle like status for a comment.
     */
    public function toggleLike(Comment $comment)
    {
        $user = Auth::user();
        $existingLike = $comment->likes()->where('user_id', $user->id)->first();
        
        if ($existingLike) {
            $existingLike->delete();
            $liked = false;
        } else {
            $comment->likes()->create([
                'user_id' => $user->id
            ]);
            $liked = true;
        }
        
        return response()->json([
            'liked' => $liked,
            'count' => $comment->likes()->count()
        ]);
    }
}
