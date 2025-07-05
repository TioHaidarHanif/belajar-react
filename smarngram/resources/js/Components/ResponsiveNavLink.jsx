import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start py-2 pe-4 ps-3 ${
                active
                    ? 'bg-secondary-bg text-highlight-color font-medium'
                    : 'text-primary-text hover:text-highlight-color hover:bg-secondary-bg'
            } text-base transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
