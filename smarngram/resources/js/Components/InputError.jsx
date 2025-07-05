export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 bg-red-50 py-1 px-2 rounded-md mt-1 ' + className}
        >
            {message}
        </p>
    ) : null;
}
