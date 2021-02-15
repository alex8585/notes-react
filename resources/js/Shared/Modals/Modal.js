import ExitIcon from './ExitIcon';
import IconButton from './IconButton';
import React, { useState } from 'react';

export default function Modal(props) {
    const { open, onClose } = props;
    if (!open) {
        return <></>;
    }
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-4 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-500">
                <div>{props.children}</div>
                <span className="absolute top-0 right-0 p-2">
                    <IconButton onClick={() => onClose()}>
                        <ExitIcon />
                    </IconButton>
                </span>
            </div>
        </div>
    );
}
