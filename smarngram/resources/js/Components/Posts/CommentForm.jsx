import React from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function CommentForm({ postId, parentId = null, onCommentAdded }) {
    const { data, setData, processing, errors, reset } = useForm({
        content: '',
        parent_id: parentId,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Use axios instead of Inertia for live updates
            const response = await axios.post(route('comments.store', postId), data);
            
            // Reset the form
            reset('content');
            
            // Notify parent component about the new comment
            if (onCommentAdded && response.data.comment) {
                onCommentAdded(response.data.comment);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-2">
                <textarea
                    value={data.content}
                    onChange={e => setData('content', e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                    rows="3"
                ></textarea>
                {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing || !data.content.trim()}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Posting...' : 'Post Comment'}
                </button>
            </div>
        </form>
    );
}
