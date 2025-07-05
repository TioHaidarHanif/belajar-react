import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { HeartIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

dayjs.extend(relativeTime);

export default function Comment({ comment, user, postId }) {
    const [editing, setEditing] = useState(false);
    const [liked, setLiked] = useState(comment.user_liked || false);
    const [likesCount, setLikesCount] = useState(comment.likes_count || 0);
    
    const { data, setData, patch, delete: destroy, processing, errors } = useForm({
        content: comment.content,
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route('comments.update', comment.id), {
            onSuccess: () => {
                setEditing(false);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            destroy(route('comments.destroy', comment.id));
        }
    };

    const toggleLike = async () => {
        try {
            const response = await axios.post(route('comments.like', comment.id));
            setLiked(response.data.liked);
            setLikesCount(response.data.count);
        } catch (error) {
            console.error('Error toggling like', error);
        }
    };

    const canEdit = user && (user.id === comment.user_id || user.is_admin);
    const canDelete = user && (user.id === comment.user_id || user.id === postId || user.is_admin);

    return (
        <div className="border-b border-gray-100 py-4">
            <div className="flex items-start">
                <img 
                    src={comment.user.profile?.avatar || `https://ui-avatars.com/api/?name=${comment.user.name}&background=random`}
                    alt={comment.user.name}
                    className="h-8 w-8 rounded-full object-cover mr-3"
                />
                
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-semibold text-sm">{comment.user.name}</span>
                            <span className="text-xs text-gray-500 ml-2">{dayjs(comment.created_at).fromNow()}</span>
                        </div>
                        
                        {(canEdit || canDelete) && !editing && (
                            <div className="flex space-x-2">
                                {canEdit && (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={handleDelete}
                                        className="text-gray-400 hover:text-red-600"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {editing ? (
                        <form onSubmit={handleUpdate} className="mt-1">
                            <textarea
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                                rows="3"
                            ></textarea>
                            {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                            
                            <div className="flex justify-end space-x-2 mt-2">
                                <button 
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="px-3 py-1 text-xs text-gray-700 rounded hover:bg-gray-100"
                                    disabled={processing}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-3 py-1 text-xs bg-pink-600 text-white rounded hover:bg-pink-700"
                                    disabled={processing}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-1">
                            <p className="text-sm text-gray-800">{comment.content}</p>
                            
                            <div className="flex items-center mt-2 space-x-4">
                                <button 
                                    onClick={toggleLike}
                                    className="flex items-center text-xs text-gray-500 hover:text-pink-600"
                                >
                                    {liked ? (
                                        <HeartIconSolid className="h-4 w-4 mr-1 text-pink-600" />
                                    ) : (
                                        <HeartIcon className="h-4 w-4 mr-1" />
                                    )}
                                    <span>{likesCount > 0 ? likesCount : ''} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                                </button>
                                
                                {/* Reply button - if implementing nested comments */}
                                {/* <button 
                                    className="flex items-center text-xs text-gray-500 hover:text-blue-600"
                                >
                                    <ReplyIcon className="h-4 w-4 mr-1" />
                                    Reply
                                </button> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* If implementing nested comments, render child comments here */}
            {/* {comment.replies && comment.replies.length > 0 && (
                <div className="ml-10 mt-2">
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} user={user} postId={postId} />
                    ))}
                </div>
            )} */}
        </div>
    );
}
