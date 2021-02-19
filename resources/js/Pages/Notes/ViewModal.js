import React from 'react';
import UiModal from '../../Shared/UiModal';
import parse from 'html-react-parser';

export default function ViewModal(props) {
    const { viewIsOpen, setViewIsOpen, curentItem } = props;

    
    if(!curentItem) {
        return null;
    }

    return (    
        <UiModal title="Note details" 
            handleClose={ () => setViewIsOpen(false)} 
            open={viewIsOpen}
          >
            
            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <div className='my-4'>
                  <span>id: </span>
                  <span> {curentItem ?  curentItem.id :''}</span>
                </div>
                
                <div className='my-4'>
                  <span>Note title: </span>
                  <span> {curentItem ? curentItem.title :''}</span>
                </div>
                
                <div className='my-4'>
                  <span>Note category: </span>
                  <span> {(curentItem && curentItem.category) ? curentItem.category.name :''}</span>
                </div>

                <div className='my-4'>
                  <span>Note text: </span>
                  <span> {(curentItem && curentItem.body) ? parse(curentItem.body) : ''}</span>
                </div>

                

            </div>
            
        </UiModal>  
        );
}