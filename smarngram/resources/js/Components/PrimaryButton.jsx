export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg text-white 
                bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 
                transition-all duration-200 ease-in-out shadow-md hover:shadow-lg 
                focus:outline-none focus:ring-opacity-50 ${
                    disabled && 'opacity-60 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
