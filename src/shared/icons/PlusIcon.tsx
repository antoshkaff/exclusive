import React from 'react';

type iconProps = {
    size?: number;
};

const PlusIcon = ({ size = 24 }: iconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 20V12M12 12V4M12 12H20M12 12H4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default PlusIcon;
