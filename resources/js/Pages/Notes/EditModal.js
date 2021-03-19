import React, {useState } from 'react';
import UiModal from '../../Shared/UiModal';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import EditorInput from '@/Shared/EditorInput';
import { Inertia } from '@inertiajs/inertia';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {setCurrentItem} from './Redux/actions';


function EditModal({setCurrentItem,  editIsOpen, setEditIsOpen, currentItem, errors, categories }) {
  
    const [sending, setSending] = useState(false);

    function handleChange(e) {
      const key = e.target.name;
      const value = e.target.value;
      setCurrentItem({
          ...currentItem,
          [key]: value
      })
    }

    function handleChangEditor(event, editor) {
      const data = editor.getData();
      setCurrentItem({
          ...currentItem,
          body: data
      })
    }
    
    function editHandleSubmit(e) {
        e.preventDefault();
        setSending(true);

        Inertia.put(route('notes.update', currentItem.id), currentItem, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                setEditIsOpen(false);
            },
            onError: (errors) => {
                //console.log(errors);
                //setEditIsOpen(false);
            },
            onFinish: (e) => {
             // console.log(e);
              setSending(false);
            },
        });
    }

    return (    
        <UiModal title="Edit note" handleClose={ () => setEditIsOpen(false)} 
                  open={editIsOpen}
                  buttons={
                <React.Fragment>
                    <div className="p-1">
                    <LoadingButton
                      onClick={editHandleSubmit}
                      loading={sending}
                      type="submit"
                      className="btn-indigo"
                    >
                      Save
                    </LoadingButton>
                    </div>
                </React.Fragment>
            }>

            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <form>
                  <div className="flex flex-wrap p-8 -mb-8 -mr-6">
                      <TextInput
                        className="w-full pb-8 pr-6 lg:w-1/2"
                        label="Note title"
                        name="title"
                        errors={errors.title}
                        value={currentItem.title}
                        onChange={handleChange}
                      />

                      <SelectInput
                        className="w-full pb-8 pr-6 lg:w-1/2"
                        label="Category"
                        name="category_id"
                        errors={errors.category_id}
                        value={currentItem.category_id ?? ''}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        {categories.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </SelectInput>
                      <EditorInput
                          label="Text"
                          value={currentItem.body}
                          onChange={ (event, editor) => handleChangEditor( event, editor ) }
                          errors={errors.body}
                      />
                  </div>

                </form>
            </div>
        </UiModal>  
        );
}

const mapStateToProps = (state) => {
    return {
      currentItem: state.notes.currentItem,
    }
}

const actions = {
  setCurrentItem
}


const withConnect = connect(
  mapStateToProps,
  actions
);



export default compose(
  withConnect,
)(EditModal);
