import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const user = auth.user;
    
    // Mock data for the Instagram-like feed
    const [posts] = useState([
        {
            id: 1,
            user: {
                name: 'John Smith',
                username: 'johnsmith',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            image: 'https://picsum.photos/id/231/600/600',
            caption: 'Learning new things every day! #education #elearning',
            likes: 125,
            comments: 14,
            timestamp: '25m ago'
        },
        {
            id: 2,
            user: {
                name: 'Sarah Johnson',
                username: 'sarahj',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            image: 'https://picsum.photos/id/24/600/600',
            caption: 'Just finished this amazing course on machine learning! #AI #education',
            likes: 89,
            comments: 7,
            timestamp: '2h ago'
        },
        {
            id: 3,
            user: {
                name: 'Alex Williams',
                username: 'alexw',
                avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
            },
            image: 'https://picsum.photos/id/96/600/600',
            caption: 'Working on my new project. Stay tuned for updates! #coding #programming',
            likes: 214,
            comments: 31,
            timestamp: '4h ago'
        }
    ]);

    return (
        <AuthenticatedLayout>
            <Head title="Feed" />

            <div className="flex">
                {/* Main Feed */}
                <div className="w-full md:w-2/3 px-4">
                    {/* Stories */}
                    <div className="glossy-card mb-6 overflow-x-auto">
                        <div className="flex p-4 space-x-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div key={item} className="flex flex-col items-center space-y-1 flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
                                        <img 
                                            src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item * 10}.jpg`}
                                            className="rounded-full border-2 border-white w-full h-full object-cover"
                                            alt="Story"
                                        />
                                    </div>
                                    <span className="text-xs">user_{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Posts */}
                    {posts.map(post => (
                        <div key={post.id} className="instagram-post mb-6">
                            {/* Post Header */}
                            <div className="flex items-center p-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-3">
                                    <img 
                                        src={post.user.avatar}
                                        className="rounded-full border-2 border-white w-full h-full object-cover"
                                        alt={post.user.name} 
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="font-semibold text-sm">{post.user.username}</span>
                                </div>
                                <button className="text-secondary-text">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Post Image */}
                            <div>
                                <img src={post.image} alt="Post" className="w-full" />
                            </div>
                            
                            {/* Post Actions */}
                            <div className="p-3">
                                <div className="flex space-x-4">
                                    <button className="text-primary-text">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <button className="text-primary-text">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </button>
                                    <button className="text-primary-text">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                </div>
                                
                                {/* Likes */}
                                <div className="mt-2">
                                    <span className="font-semibold text-sm">{post.likes} likes</span>
                                </div>
                                
                                {/* Caption */}
                                <div className="mt-1">
                                    <span className="font-semibold text-sm mr-1">{post.user.username}</span>
                                    <span className="text-sm">{post.caption}</span>
                                </div>
                                
                                {/* Comments */}
                                <div className="mt-1">
                                    <button className="text-secondary-text text-sm">
                                        View all {post.comments} comments
                                    </button>
                                </div>
                                
                                {/* Timestamp */}
                                <div className="mt-1">
                                    <span className="text-secondary-text text-xs">{post.timestamp}</span>
                                </div>
                            </div>
                            
                            {/* Comment Input */}
                            <div className="flex items-center p-3 border-t border-border-color">
                                <button className="text-primary-text mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <input 
                                    type="text" 
                                    placeholder="Add a comment..." 
                                    className="flex-1 border-none bg-transparent text-sm focus:outline-none"
                                />
                                <button className="text-highlight-color font-semibold text-sm ml-3">Post</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Sidebar (only visible on medium screens and up) */}
                <div className="hidden md:block md:w-1/3 px-4">
                    <div className="sticky top-20">
                        {/* User Profile */}
                        <div className="flex items-center mb-5">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5 mr-4">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${user.name}&color=7F9CF5&background=EBF4FF`}
                                    className="rounded-full border-2 border-white w-full h-full object-cover"
                                    alt={user.name} 
                                />
                            </div>
                            <div>
                                <div className="font-semibold">{user.username}</div>
                                <div className="text-secondary-text">{user.name}</div>
                            </div>
                        </div>
                        
                        {/* Suggestions */}
                        <div className="mb-4">
                            <div className="flex justify-between mb-3">
                                <span className="font-semibold text-secondary-text">Suggestions For You</span>
                                <button className="text-xs font-semibold">See All</button>
                            </div>
                            
                            {/* Suggested Users */}
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full mr-3">
                                            <img 
                                                src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item * 5}.jpg`}
                                                className="rounded-full w-full h-full object-cover"
                                                alt={`Suggested user ${item}`} 
                                            />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">user_{item * 123}</div>
                                            <div className="text-xs text-secondary-text">Suggested for you</div>
                                        </div>
                                    </div>
                                    <button className="text-highlight-color text-xs font-semibold">Follow</button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Footer Links */}
                        <div className="text-xs text-secondary-text">
                            <div className="mb-4">
                                <a href="#" className="mr-3">About</a>
                                <a href="#" className="mr-3">Help</a>
                                <a href="#" className="mr-3">Press</a>
                                <a href="#" className="mr-3">API</a>
                                <a href="#" className="mr-3">Jobs</a>
                                <a href="#" className="mr-3">Privacy</a>
                                <a href="#" className="mr-3">Terms</a>
                            </div>
                            
                            <div>
                                © 2023 SMARTGRAM FROM LARAVEL + REACT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
