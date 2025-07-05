import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function UserPosts({ posts, auth }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    return (
        <AuthenticatedLayout>
            <Head title="My Posts" />
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">My Posts</h1>
                    <Link
                        href={route('posts.create')}
                        className="instagram-btn"
                    >
                        Create New Post
                    </Link>
                </div>
                
                {posts.data.length === 0 ? (
                    <div className="glossy-card p-6 text-center">
                        <p className="text-secondary-text mb-4">You haven't created any posts yet.</p>
                        <Link
                            href={route('posts.create')}
                            className="instagram-btn"
                        >
                            Create Your First Post
                        </Link>
                    </div>
                ) : (
                    <div className="glossy-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-secondary-bg">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary-text">Title</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary-text">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary-text">Comments</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-primary-text">Created</th>
                                        <th className="px-4 py-3 text-right text-sm font-semibold text-primary-text">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-color">
                                    {posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-secondary-bg">
                                            <td className="px-4 py-3 text-sm">
                                                <Link
                                                    href={route('posts.show', post.id)}
                                                    className="font-medium text-highlight-color hover:underline"
                                                >
                                                    {post.title}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    post.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-secondary-text mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    {post.comments?.length || 0}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-secondary-text">
                                                {formatDate(post.created_at)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right space-x-2">
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                
                {/* Pagination */}
                {posts.data.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        {posts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-3 py-1 mx-1 text-sm rounded ${
                                    link.active
                                        ? 'bg-highlight-color text-white'
                                        : link.url
                                            ? 'bg-secondary-bg text-primary-text hover:bg-border-color'
                                            : 'bg-secondary-bg text-secondary-text cursor-default'
                                }`}
                                preserveScroll
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
