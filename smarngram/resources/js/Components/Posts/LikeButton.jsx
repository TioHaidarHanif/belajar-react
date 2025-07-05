import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import axios from 'axios';

export default function LikeButton({ initialLiked, likesCount, routeName, itemId }) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(likesCount || 0);
    const [isLoading, setIsLoading] = useState(false);

    const toggleLike = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const response = await axios.post(route(routeName, itemId));
            setLiked(response.data.liked);
            setCount(response.data.count);
        } catch (error) {
            console.error('Error toggling like', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={toggleLike}
            disabled={isLoading}
            className={`flex items-center space-x-1 ${liked ? 'text-pink-600' : 'text-gray-500'} hover:text-pink-600 transition-colors duration-200`}
        >
            {liked ? (
                <HeartIconSolid className="h-5 w-5" />
            ) : (
                <HeartIcon className="h-5 w-5" />
            )}
            <span>{count > 0 ? count : ''}</span>
        </button>
    );
}
