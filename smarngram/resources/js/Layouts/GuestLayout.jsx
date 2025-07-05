import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-secondary-bg flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div className="w-full sm:max-w-md px-6 py-4 glossy-card mt-6 transform transition-all">
                <div className="flex justify-center mb-6 mt-4">
                    <Link href="/" className="inline-flex items-center">
                        <ApplicationLogo className="h-16 w-auto" />
                    </Link>
                </div>
                
                <div className="w-full">
                    {children}
                </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-secondary-text">
                <p>© 2023 Smartgram. All rights reserved.</p>
                <p className="mt-1">The social media platform for e-social learning</p>
            </div>
        </div>
    );
}
