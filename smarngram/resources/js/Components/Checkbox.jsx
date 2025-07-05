export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'w-4 h-4 rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-300 focus:ring-offset-0 transition duration-150 ease-in-out ' +
                className
            }
        />
    );
}
