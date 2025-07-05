import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { HeartIcon, ChatBubbleLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

dayjs.extend(relativeTime);

export default function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(post.is_liked || false);
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);

    const toggleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        try {
            const response = await axios.post(route('posts.like.toggle', post.id));
            
            if (response.data.success) {
                setIsLiked(response.data.liked);
                setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="p-4">
                {/* User info */}
                <div className="flex items-center mb-2">
                    <img 
                        src={post.user.profile?.avatar || `https://ui-avatars.com/api/?name=${post.user.name}&background=random`} 
                        alt={post.user.name} 
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="ml-2">
                        <span className="text-sm font-semibold">{post.user.name}</span>
                        <p className="text-xs text-gray-500">{dayjs(post.created_at).fromNow()}</p>
                    </div>
                </div>
                
                {/* Media */}
                {post.media_url && (
                    <div className="mb-3 overflow-hidden rounded-md">
                        <Link href={route('posts.show', post.id)}>
                            {post.media_type === 'image' ? (
                                <img 
                                    src={post.media_url} 
                                    alt={post.title} 
                                    className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            ) : post.media_type === 'video' ? (
                                <video 
                                    src={post.media_url} 
                                    className="w-full h-48 sm:h-64 object-cover" 
                                    controls
                                />
                            ) : (
                                <div className="w-full h-48 sm:h-64 flex items-center justify-center bg-gray-100">
                                    <span className="text-gray-500">Document</span>
                                </div>
                            )}
                        </Link>
                    </div>
                )}
                
                {/* Title & Content */}
                <Link href={route('posts.show', post.id)} className="block">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-pink-600 transition">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {post.content}
                    </p>
                </Link>
                
                {/* Engagement stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={toggleLike}
                            className="flex items-center focus:outline-none"
                        >
                            {isLiked ? (
                                <HeartIconSolid className="h-4 w-4 mr-1 text-pink-500" />
                            ) : (
                                <HeartIcon className="h-4 w-4 mr-1 text-pink-500" />
                            )}
                            {likesCount}
                        </button>
                        <span className="flex items-center">
                            <ChatBubbleLeftIcon className="h-4 w-4 mr-1 text-blue-500" />
                            {commentsCount}
                        </span>
                        <span className="flex items-center">
                            <EyeIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {post.view_count || 0}
                        </span>
                    </div>
                    <Link 
                        href={route('posts.show', post.id)} 
                        className="text-pink-600 hover:text-pink-800 font-medium"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
}
