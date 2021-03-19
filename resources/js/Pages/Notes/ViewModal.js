import React from 'react';
import UiModal from '../../Shared/UiModal';
import parse from 'html-react-parser';
import {connect} from 'react-redux';
import { compose } from 'redux';

function ViewModal({ viewIsOpen, setViewIsOpen, currentItem }) {

    return (    
        <UiModal title="Note details" 
            handleClose={ () => setViewIsOpen(false)} 
            open={viewIsOpen}
          >
            
            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <div className='my-4'>
                  <span>id: </span>
                  <span> {currentItem ?  currentItem.id :''}</span>
                </div>
                
                <div className='my-4'>
                  <span>Note title: </span>
                  <span> {currentItem ? currentItem.title :''}</span>
                </div>
                
                <div className='my-4'>
                  <span>Note category: </span>
                  <span> {(currentItem && currentItem.category) ? currentItem.category.name :''}</span>
                </div>

                <div className='my-4'>
                  <span>Note text: </span>
                  <span> {(currentItem && currentItem.body) ? parse(currentItem.body) : ''}</span>
                </div>
            </div>
        </UiModal>  
        );
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.notes.currentItem,
  }
}

const withConnect = connect(
    mapStateToProps,
);


export default compose(
    withConnect,
)(ViewModal);