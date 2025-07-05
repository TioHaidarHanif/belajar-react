import { useState } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import axios from 'axios';
import CommentForm from '@/Components/Posts/CommentForm';
import Comment from '@/Components/Posts/Comment';

export default function Show({ post: initialPost, userLike, auth }) {
    const [post, setPost] = useState(initialPost);
    const [liked, setLiked] = useState(userLike);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments || []);
    const [commentsCount, setCommentsCount] = useState(post.comments?.length || 0);
    const [activeComment, setActiveComment] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [isReplying, setIsReplying] = useState(false);
    
    const { data: editData, setData: setEditData, patch: updateComment, processing: processingEdit, reset: resetEdit, errors: editErrors } = useForm({
        content: '',
    });
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    const handleLike = async () => {
        try {
            const response = await axios.post(route('posts.like', post.id));
            
            const data = response.data;
            setLiked(data.liked);
            setLikeCount(data.count);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };
    
    const handleCommentLike = async (commentId) => {
        try {
            const response = await axios.post(route('comments.like', commentId));
            
            // Update the comments state
            setComments(prevComments => 
                prevComments.map(comment => 
                    comment.id === commentId 
                        ? { 
                            ...comment, 
                            user_liked: response.data.liked,
                            likes_count: response.data.count 
                          } 
                        : comment
                )
            );
        } catch (error) {
            console.error('Error toggling comment like:', error);
        }
    };
    
    const handleCommentAdded = (newComment) => {
        // Add the new comment to the comments state
        setComments(prevComments => [newComment, ...prevComments]);
        setCommentsCount(prevCount => prevCount + 1);
        
        // Reset reply state
        setIsReplying(false);
        setActiveComment(null);
    };
    
    const handleEditSubmit = (e, commentId) => {
        e.preventDefault();
        
        updateComment(route('comments.update', commentId), {
            preserveScroll: true,
            onSuccess: () => {
                resetEdit();
                setEditingComment(null);
            },
        });
    };
    
    const startReply = (commentId) => {
        setIsReplying(true);
        setActiveComment(commentId);
    };
    
    const startEdit = (comment) => {
        setEditingComment(comment.id);
        setEditData('content', comment.content);
    };
    
    const deleteComment = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('comments.destroy', commentId), {
                preserveScroll: true,
                onSuccess: () => {
                    // Update comments state
                    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
                    setCommentsCount(prevCount => prevCount - 1);
                }
            });
        }
    };
    
    const canModifyPost = auth.user && (auth.user.id === post.user.id || auth.user.is_admin);
    
    return (
        <AuthenticatedLayout>
            <Head title={post.title} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="glossy-card mb-8">
                    {/* Post Header */}
                    <div className="flex items-center p-4 border-b border-border-color">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-3">
                            <img 
                                src={post.user.avatar || `https://ui-avatars.com/api/?name=${post.user.name}&color=7F9CF5&background=EBF4FF`}
                                className="rounded-full border-2 border-white w-full h-full object-cover"
                                alt={post.user.name} 
                            />
                        </div>
                        <div className="flex-1">
                            <span className="font-semibold">{post.user.username || post.user.name}</span>
                            <p className="text-xs text-secondary-text">
                                Posted on {formatDate(post.created_at)}
                                {post.category && (
                                    <span> in {post.category.name}</span>
                                )}
                            </p>
                        </div>
                        
                        {canModifyPost && (
                            <div className="flex space-x-2">
                                <Link
                                    href={route('posts.edit', post.id)}
                                    className="text-highlight-color hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this post?')) {
                                            router.delete(route('posts.destroy', post.id));
                                        }
                                    }}
                                    className="text-danger-color hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Post Title */}
                    <div className="p-4 pb-0">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    
                    {/* Post Image/Video */}
                    {post.media_url && post.media_type === 'image' && (
                        <div className="p-4">
                            <img 
                                src={post.media_url} 
                                alt={post.title} 
                                className="w-full rounded-lg"
                            />
                        </div>
                    )}
                    
                    {post.media_url && post.media_type === 'video' && (
                        <div className="p-4">
                            <video 
                                src={post.media_url} 
                                className="w-full rounded-lg" 
                                controls
                            ></video>
                        </div>
                    )}
                    
                    {/* Post Content */}
                    <div className="p-4">
                        <div className="prose max-w-none">
                            {post.content.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="px-4 pb-4 flex flex-wrap gap-1">
                    {/* Post Actions */}
                    <div className="p-4 border-t border-border-color">
                        <div className="flex space-x-4">
                            <button 
                                onClick={handleLike}
                                className="text-primary-text flex items-center"
                            >
                                <svg className={`w-6 h-6 ${liked ? 'text-red-500 fill-current' : ''}`} 
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="ml-1">
                                    {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                                </span>
                            </button>
                            <div className="text-primary-text flex items-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="ml-1">
                                    {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
                                </span>
                            </div>
                            <button className="text-primary-text flex items-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span className="ml-1">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Comments Section */}
                <div className="glossy-card">
                    <div className="p-4 border-b border-border-color">
                        <h2 className="text-xl font-semibold">Comments</h2>
                    </div>
                    
                    {post.comments_enabled ? (
                        <>
                            {/* Add Comment Form */}
                            <div className="p-4 border-b border-border-color">
                                <CommentForm 
                                    postId={post.id} 
                                    onCommentAdded={handleCommentAdded} 
                                />
                            </div>
                            
                            {/* Comments List */}
                            <div className="p-4">
                                {comments.length === 0 ? (
                                    <p className="text-center text-secondary-text">No comments yet. Be the first to comment!</p>
                                ) : (
                                    <div className="space-y-4">
                                        {comments
                                            .filter(comment => !comment.parent_id) // Only top-level comments
                                            .map(comment => (
                                                <Comment 
                                                    key={comment.id} 
                                                    comment={comment} 
                                                    user={auth.user} 
                                                    postId={post.id} 
                                                />
                                            ))}
                                    </div>
                                )}
                            </div>
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-3 flex-shrink-0">
                                                            <img 
                                                                src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.name}&color=7F9CF5&background=EBF4FF`}
                                                                className="rounded-full border-2 border-white w-full h-full object-cover"
                                                                alt={comment.user.name} 
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="bg-secondary-bg rounded-lg px-3 py-2">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="font-semibold text-sm">{comment.user.username || comment.user.name}</span>
                                                                    <span className="text-xs text-secondary-text">{formatDate(comment.created_at)}</span>
                                                                </div>
                                                                
                                                                {editingComment === comment.id ? (
                                                                    <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className="mt-2">
                                                                        <textarea
                                                                            value={editData.content}
                                                                            onChange={e => setEditData('content', e.target.value)}
                                                                            className="w-full px-3 py-1 bg-primary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                                                                            rows="2"
                                                                            required
                                                                        ></textarea>
                                                                        <InputError message={editErrors.content} className="mt-1" />
                                                                        
                                                                        <div className="flex justify-end mt-2 space-x-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => setEditingComment(null)}
                                                                                className="text-sm text-secondary-text hover:text-primary-text"
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="text-sm text-highlight-color font-medium"
                                                                                disabled={processingEdit}
                                                                            >
                                                                                {processingEdit ? 'Saving...' : 'Save'}
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                ) : (
                                                                    <p className="text-sm mt-1">{comment.content}</p>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="flex items-center mt-1 text-xs">
                                                                <button 
                                                                    onClick={() => handleCommentLike(comment.id)}
                                                                    className="text-secondary-text hover:text-primary-text mr-4"
                                                                >
                                                                    Like {comment.likes?.length > 0 && `(${comment.likes.length})`}
                                                                </button>
                                                                
                                                                <button
                                                                    onClick={() => startReply(comment.id)}
                                                                    className="text-secondary-text hover:text-primary-text mr-4"
                                                                >
                                                                    Reply
                                                                </button>
                                                                
                                                                {(auth.user && (auth.user.id === comment.user.id || auth.user.id === post.user.id || auth.user.is_admin)) && (
                                                                    <>
                                                                        {auth.user.id === comment.user.id && (
                                                                            <button
                                                                                onClick={() => startEdit(comment)}
                                                                                className="text-secondary-text hover:text-primary-text mr-4"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={() => deleteComment(comment.id)}
                                                                            className="text-secondary-text hover:text-danger-color"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Reply Form */}
                                                            {isReplying && activeComment === comment.id && (
                                                                <div className="mt-3 pl-8">
                                                                    <form onSubmit={handleCommentSubmit}>
                                                                        <textarea
                                                                            value={data.content}
                                                                            onChange={e => setData('content', e.target.value)}
                                                                            placeholder={`Reply to ${comment.user.username || comment.user.name}...`}
                                                                            className="w-full px-3 py-1 bg-secondary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                                                                            rows="2"
                                                                            required
                                                                        ></textarea>
                                                                        <InputError message={errors.content} className="mt-1" />
                                                                        
                                                                        <div className="flex justify-end mt-2 space-x-2">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setIsReplying(false);
                                                                                    setActiveComment(null);
                                                                                    setData('parent_id', null);
                                                                                }}
                                                                                className="text-sm text-secondary-text hover:text-primary-text"
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                            <button
                                                                                type="submit"
                                                                                className="text-sm text-highlight-color font-medium"
                                                                                disabled={processing}
                                                                            >
                                                                                {processing ? 'Replying...' : 'Reply'}
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            )}
                                                            
                                                            {/* Replies */}
                                                            {post.comments
                                                                .filter(reply => reply.parent_id === comment.id)
                                                                .map(reply => (
                                                                    <div key={reply.id} className="mt-3 pl-8">
                                                                        <div className="flex items-start">
                                                                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-2 flex-shrink-0">
                                                                                <img 
                                                                                    src={reply.user.avatar || `https://ui-avatars.com/api/?name=${reply.user.name}&color=7F9CF5&background=EBF4FF`}
                                                                                    className="rounded-full border-2 border-white w-full h-full object-cover"
                                                                                    alt={reply.user.name} 
                                                                                />
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="bg-secondary-bg rounded-lg px-3 py-2">
                                                                                    <div className="flex justify-between items-center">
                                                                                        <span className="font-semibold text-sm">{reply.user.username || reply.user.name}</span>
                                                                                        <span className="text-xs text-secondary-text">{formatDate(reply.created_at)}</span>
                                                                                    </div>
                                                                                    
                                                                                    {editingComment === reply.id ? (
                                                                                        <form onSubmit={(e) => handleEditSubmit(e, reply.id)} className="mt-2">
                                                                                            <textarea
                                                                                                value={editData.content}
                                                                                                onChange={e => setEditData('content', e.target.value)}
                                                                                                className="w-full px-3 py-1 bg-primary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                                                                                                rows="2"
                                                                                                required
                                                                                            ></textarea>
                                                                                            <InputError message={editErrors.content} className="mt-1" />
                                                                                            
                                                                                            <div className="flex justify-end mt-2 space-x-2">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    onClick={() => setEditingComment(null)}
                                                                                                    className="text-sm text-secondary-text hover:text-primary-text"
                                                                                                >
                                                                                                    Cancel
                                                                                                </button>
                                                                                                <button
                                                                                                    type="submit"
                                                                                                    className="text-sm text-highlight-color font-medium"
                                                                                                    disabled={processingEdit}
                                                                                                >
                                                                                                    {processingEdit ? 'Saving...' : 'Save'}
                                                                                                </button>
                                                                                            </div>
                                                                                        </form>
                                                                                    ) : (
                                                                                        <p className="text-sm mt-1">{reply.content}</p>
                                                                                    )}
                                                                                </div>
                                                                                
                                                                                <div className="flex items-center mt-1 text-xs">
                                                                                    <button 
                                                                                        onClick={() => handleCommentLike(reply.id)}
                                                                                        className="text-secondary-text hover:text-primary-text mr-4"
                                                                                    >
                                                                                        Like {reply.likes?.length > 0 && `(${reply.likes.length})`}
                                                                                    </button>
                                                                                    
                                                                                    {(auth.user && (auth.user.id === reply.user.id || auth.user.id === post.user.id || auth.user.is_admin)) && (
                                                                                        <>
                                                                                            {auth.user.id === reply.user.id && (
                                                                                                <button
                                                                                                    onClick={() => startEdit(reply)}
                                                                                                    className="text-secondary-text hover:text-primary-text mr-4"
                                                                                                >
                                                                                                    Edit
                                                                                                </button>
                                                                                            )}
                                                                                            <button
                                                                                                onClick={() => deleteComment(reply.id)}
                                                                                                className="text-secondary-text hover:text-danger-color"
                                                                                            >
                                                                                                Delete
                                                                                            </button>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="p-4 text-center text-secondary-text">
                            Comments are disabled for this post.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
