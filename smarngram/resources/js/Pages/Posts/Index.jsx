import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Index({ posts }) {
    const [likes, setLikes] = useState({});
    
    // Add a global event handler to prevent errors from browser extensions
    useEffect(() => {
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        
        // Override the addEventListener method to protect against browser extensions
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const wrappedListener = function(event) {
                try {
                    listener.call(this, event);
                } catch (error) {
                    console.warn('Event listener error suppressed:', error);
                }
            };
            return originalAddEventListener.call(this, type, wrappedListener, options);
        };
        
        // Clean up when component unmounts
        return () => {
            EventTarget.prototype.addEventListener = originalAddEventListener;
        };
    }, []);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const handleLike = async (postId, event) => {
        try {
            // Prevent the event from bubbling up to document
            if (event) {
                event.stopPropagation();
            }
            
            const response = await axios.post(route('posts.like', postId));
            
            const data = response.data;
            setLikes({
                ...likes,
                [postId]: {
                    liked: data.liked,
                    count: data.count,
                },
            });
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };
    
    return (
        <AuthenticatedLayout>
            <Head title="Posts" />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Posts</h1>
                    <Link
                        href={route('posts.create')}
                        className="instagram-btn"
                    >
                        Create New Post
                    </Link>
                </div>
                
                {posts.data.length === 0 ? (
                    <div className="glossy-card p-6 text-center">
                        <p className="text-secondary-text">No posts found. Be the first to create a post!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {posts.data.map((post) => (
                            <div key={post.id} className="instagram-post">
                                {/* Post Header */}
                                <div className="flex items-center p-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-3">
                                        <img 
                                            src={post.user.avatar || `https://ui-avatars.com/api/?name=${post.user.name}&color=7F9CF5&background=EBF4FF`}
                                            className="rounded-full border-2 border-white w-full h-full object-cover"
                                            alt={post.user.name} 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-semibold text-sm">{post.user.username || post.user.name}</span>
                                        {post.category && (
                                            <span className="text-xs text-secondary-text ml-2">
                                                in {post.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-secondary-text">
                                        {formatDate(post.created_at)}
                                    </span>
                                </div>
                                
                                {/* Post Title */}
                                <div className="px-3 pb-2">
                                    <Link 
                                        href={route('posts.show', post.id)}
                                        className="font-semibold hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                                
                                {/* Post Image */}
                                {post.media_url && post.media_type === 'image' && (
                                    <Link href={route('posts.show', post.id)}>
                                        <img 
                                            src={post.media_url} 
                                            alt={post.title} 
                                            className="w-full max-h-[500px] object-cover"
                                        />
                                    </Link>
                                )}
                                
                                {/* Post Video */}
                                {post.media_url && post.media_type === 'video' && (
                                    <video 
                                        src={post.media_url} 
                                        className="w-full" 
                                        controls
                                    ></video>
                                )}
                                
                                {/* Post Content Preview */}
                                {!post.media_url && (
                                    <div className="p-3">
                                        <p className="text-sm mb-2 line-clamp-3">
                                            {post.content}
                                        </p>
                                    </div>
                                )}
                                
                                {/* Post Actions */}
                                <div className="p-3 border-t border-border-color">
                                    <div className="flex space-x-4">
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleLike(post.id, e);
                                                return false; // extra safety to prevent event bubbling
                                            }}
                                            onMouseUp={(e) => {
                                                e.stopPropagation(); 
                                                e.preventDefault();
                                                return false;
                                            }}
                                            className="text-primary-text flex items-center"
                                        >
                                            <svg 
                                                className={likes[post.id]?.liked ? "w-6 h-6 text-red-500 fill-current" : "w-6 h-6"} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span className="ml-1 text-sm">
                                                {likes[post.id]?.count || post.likes_count || 0}
                                            </span>
                                        </button>
                                        <Link 
                                            href={route('posts.show', post.id)}
                                            className="text-primary-text flex items-center"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span className="ml-1 text-sm">
                                                {post.comments_count || 0}
                                            </span>
                                        </Link>
                                        
                                        <Link 
                                            href={route('posts.show', post.id)}
                                            className="text-highlight-color text-sm ml-auto"
                                        >
                                            Read more
                                        </Link>
                                    </div>
                                    
                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1">
                                            {post.tags.map(tag => (
                                                <span 
                                                    key={tag.id}
                                                    className="text-xs px-2 py-1 bg-secondary-bg rounded-full text-secondary-text"
                                                >
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Pagination */}
                {posts.data.length > 0 && posts.links && (
                    <div className="mt-8 flex justify-center">
                        {posts.links.map((link, i) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={i}
                                        className="px-3 py-1 mx-1 text-sm rounded bg-secondary-bg text-secondary-text cursor-default"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }
                            
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-3 py-1 mx-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-highlight-color text-white'
                                            : 'bg-secondary-bg text-primary-text hover:bg-border-color'
                                    }`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
