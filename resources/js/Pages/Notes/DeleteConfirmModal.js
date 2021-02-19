import React, {useState } from 'react';
import UiModal from '../../Shared/UiModal';
import LoadingButton from '@/Shared/LoadingButton';
import { Inertia } from '@inertiajs/inertia';

export default function DeleteConfirmModal(props) {
    const { open, itemId, setConfirmIsOpen } = props;

    let onConfirm = () => {
        Inertia.delete(route('notes.destroy', itemId));
        setConfirmIsOpen(false)
    }

    if(!itemId) {
        return null;
    }

    return (    
        <UiModal  title="Delete note ?" 
            handleClose={ () => setConfirmIsOpen(false)} 
            open={open}
            buttons={
                <React.Fragment>
                    <div className="p-1">
                    <LoadingButton
                        onClick={onConfirm}
                        loading={false}
                        type="submit"
                        className="btn-indigo"
                    >
                        Delete
                    </LoadingButton>
                    </div>
                </React.Fragment>
            } >
            
            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <span>Are you sure you want to delete this note?</span>

            </div>
            
        </UiModal>  
        );
}