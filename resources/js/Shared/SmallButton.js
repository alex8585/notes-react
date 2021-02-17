import React from 'react';

export default function SmallButton(props) {
    const { type = 'button', children, onClick, className = 'btn btn-red' } = props;
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
