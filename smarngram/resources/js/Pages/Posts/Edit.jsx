import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head } from '@inertiajs/react';

export default function Edit({ post, categories, tags, postTags }) {
    const [selectedImage, setSelectedImage] = useState(post.media_url);
    
    const { data, setData, patch, processing, errors } = useForm({
        title: post.title || '',
        content: post.content || '',
        category_id: post.category_id || '',
        tags: postTags || [],
        media: null,
        is_published: post.is_published,
        comments_enabled: post.comments_enabled,
        _method: 'PATCH',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        patch(route('posts.update', post.id), {
            preserveScroll: true,
        });
    };
    
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('media', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleTagChange = (tagId) => {
        const currentTags = [...data.tags];
        if (currentTags.includes(tagId)) {
            setData('tags', currentTags.filter(id => id !== tagId));
        } else {
            setData('tags', [...currentTags, tagId]);
        }
    };
    
    return (
        <AuthenticatedLayout>
            <Head title={`Edit: ${post.title}`} />
            
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="glossy-card p-6">
                    <h2 className="text-2xl font-semibold mb-6">Edit Post</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>
                        
                        <div className="mb-4">
                            <InputLabel htmlFor="content" value="Content" />
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-secondary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                                rows="6"
                            ></textarea>
                            <InputError message={errors.content} className="mt-2" />
                        </div>
                        
                        <div className="mb-4">
                            <InputLabel htmlFor="category" value="Category (Optional)" />
                            <select
                                id="category"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full px-4 py-2 bg-secondary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>
                        
                        {tags.length > 0 && (
                            <div className="mb-4">
                                <InputLabel value="Tags (Optional)" />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag) => (
                                        <div 
                                            key={tag.id}
                                            onClick={() => handleTagChange(tag.id)}
                                            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                                                data.tags.includes(tag.id)
                                                    ? 'bg-highlight-color text-white'
                                                    : 'bg-secondary-bg text-primary-text border border-border-color'
                                            }`}
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                                <InputError message={errors.tags} className="mt-2" />
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <InputLabel htmlFor="media" value="Media (Optional)" />
                            
                            {post.media_url && (
                                <div className="mb-2">
                                    <p className="text-sm text-secondary-text mb-2">Current media:</p>
                                    {post.media_type === 'image' ? (
                                        <img 
                                            src={post.media_url} 
                                            alt="Current" 
                                            className="max-h-48 rounded"
                                        />
                                    ) : post.media_type === 'video' ? (
                                        <video 
                                            src={post.media_url} 
                                            className="max-h-48 rounded" 
                                            controls
                                        ></video>
                                    ) : (
                                        <div className="text-sm">Current document: {post.media_url.split('/').pop()}</div>
                                    )}
                                </div>
                            )}
                            
                            <input
                                id="media"
                                type="file"
                                onChange={handleMediaChange}
                                className="w-full px-4 py-2 bg-secondary-bg rounded-md border border-border-color focus:border-highlight-color focus:outline-none shadow-sm transition duration-150 ease-in-out"
                                accept="image/*,video/*"
                            />
                            <p className="text-xs text-secondary-text mt-1">
                                Leave empty to keep the current media, or upload a new one to replace it.
                            </p>
                            <InputError message={errors.media} className="mt-2" />
                            
                            {data.media && (
                                <div className="mt-2">
                                    <p className="text-sm text-secondary-text mb-2">New media preview:</p>
                                    <img 
                                        src={selectedImage} 
                                        alt="Preview" 
                                        className="max-h-48 rounded"
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="mb-4 flex space-x-4">
                            <div className="flex items-center">
                                <input
                                    id="is_published"
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="w-4 h-4 text-highlight-color focus:ring-highlight-color rounded"
                                />
                                <label htmlFor="is_published" className="ml-2 text-sm font-medium text-primary-text">
                                    Published
                                </label>
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    id="comments_enabled"
                                    type="checkbox"
                                    checked={data.comments_enabled}
                                    onChange={(e) => setData('comments_enabled', e.target.checked)}
                                    className="w-4 h-4 text-highlight-color focus:ring-highlight-color rounded"
                                />
                                <label htmlFor="comments_enabled" className="ml-2 text-sm font-medium text-primary-text">
                                    Enable comments
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-end mt-6">
                            <PrimaryButton 
                                className="ml-4" 
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Update Post'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
