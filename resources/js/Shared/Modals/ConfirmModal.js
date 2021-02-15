import React from 'react';
import Modal from './Modal';
import Button from '../SmallButton';

export default function ConfirmModal(props) {
    const { open, onClose, onConfirm, onReject, title, children } = props;

    if (!open) {
        return <></>;
    }

    let onClickNo = () => {
        onClose();

        if (typeof onReject !== "undefined") {
            onReject();
        }
    }

    let onClickYes = () => {
        onClose();

        if (typeof onConfirm !== "undefined") {
            onConfirm();
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl">{title}</h2>
            <div className="py-5">{children}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <Button
                        onClick={onClickNo}
                        className="btn-indigo hover:bg-secondary-light"
                    >
                        No
                    </Button>
                </div>
                <div className="p-1">
                    <Button
                        onClick={onClickYes} className="btn-indigo hover:bg-secondary-light">
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
