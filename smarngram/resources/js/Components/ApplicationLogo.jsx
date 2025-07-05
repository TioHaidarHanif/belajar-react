export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 120 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path 
                    d="M12 10C12 8.89543 12.8954 8 14 8H36C37.1046 8 38 8.89543 38 10V30C38 31.1046 37.1046 32 36 32H14C12.8954 32 12 31.1046 12 30V10Z" 
                    fill="#4F46E5" 
                />
                <path 
                    d="M20 16C20 15.4477 20.4477 15 21 15H29C29.5523 15 30 15.4477 30 16V24C30 24.5523 29.5523 25 29 25H21C20.4477 25 20 24.5523 20 24V16Z" 
                    fill="white" 
                />
                <path 
                    d="M45 12.5C45 11.6716 45.6716 11 46.5 11H64.5C65.3284 11 66 11.6716 66 12.5V27.5C66 28.3284 65.3284 29 64.5 29H46.5C45.6716 29 45 28.3284 45 27.5V12.5Z" 
                    fill="#4F46E5" 
                />
                <text x="52" y="22" fontFamily="Arial" fontSize="8" fill="white" fontWeight="bold">SMART</text>
                <text x="70" y="22" fontFamily="Arial" fontSize="8" fill="#4F46E5" fontWeight="bold">GRAM</text>
            </g>
        </svg>
    );
}
