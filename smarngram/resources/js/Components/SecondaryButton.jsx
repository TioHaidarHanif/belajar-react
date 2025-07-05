export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg
                text-indigo-600 bg-white border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300
                focus:ring-4 focus:ring-indigo-100 transition-all duration-200 ease-in-out
                focus:outline-none ${
                    disabled && 'opacity-60 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
