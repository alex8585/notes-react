import React from 'react';
import Modal from './Modal';
import Button from '../SmallButton';

export default function ModalWithButtons(props) {
    const { open, onClose, title, children, onConfirm, buttons } = props;
    if (!open) {
        return <></>;
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl">{title}</h2>
            <div className="py-4">{children}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <Button
                        onClick={() => onClose()}
                        className="btn-indigo hover:bg-secondary-light">
                        Cancel
                    </Button>
                </div>

                {buttons}

            </div>
        </Modal>
    );
}
