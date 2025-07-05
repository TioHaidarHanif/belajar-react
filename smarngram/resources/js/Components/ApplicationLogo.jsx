export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 160 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
            </defs>
            <g>
                <path 
                    d="M10 8C10 6.89543 10.8954 6 12 6H36C37.1046 6 38 6.89543 38 8V28C38 29.1046 37.1046 30 36 30H12C10.8954 30 10 29.1046 10 28V8Z" 
                    fill="url(#instagramGradient)" 
                />
                <circle cx="24" cy="18" r="6" fill="white" />
                <circle cx="24" cy="18" r="4" fill="url(#instagramGradient)" />
                <circle cx="31" cy="11" r="1.5" fill="white" />
                
                <text x="42" y="22" fontFamily="Arial" fontSize="16" fill="#262626" fontWeight="bold" letterSpacing="0.5">Smartgram</text>
            </g>
        </svg>
    );
}
