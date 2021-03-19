import React, {useState,useEffect } from 'react';
import UiModal from '../../Shared/UiModal';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import EditorInput from '@/Shared/EditorInput';

import { Inertia } from '@inertiajs/inertia';
import useEditor from "@h/useEditor";
import useFormValues from "@h/useFormValues";
import {connect} from 'react-redux';
import { compose } from 'redux';
function EditModal(props) {
    
    const {  editIsOpen, setEditIsOpen, currentItem,
          errors, categories } = props;

    const [body, handleChangEditor, resetEditor, setCurrentEditor] = useEditor('');
    const [values, handleChange, resetValues, setCurrentValues] = useFormValues({});
    


    const [sending, setSending] = useState(false);
    
    useEffect(()=> {
        if(currentItem) {
          setCurrentEditor(currentItem.body);
          setCurrentValues({
            title:currentItem.title,
            category_id:currentItem.category_id,
          })
        }
    },[currentItem])

    function editHandleSubmit(e) {
        e.preventDefault();
        setSending(true);
        let sendData = {
          ...values,
          body
        }
        Inertia.put(route('notes.update', currentItem.id), sendData, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                setEditIsOpen(false);
            },
            onError: (errors) => {
                //console.log(errors);
                setEditIsOpen(false);
            },
            onFinish: (e) => {
             // console.log(e);
              setSending(false);
            },
        });
      }

      if(!values) {
          return null;
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
                        value={values.title}
                        onChange={handleChange}
                      />

                      <SelectInput
                        className="w-full pb-8 pr-6 lg:w-1/2"
                        label="Category"
                        name="category_id"
                        errors={errors.category_id}
                        value={values.category_id ?? ''}
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
                          value={body}
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
const withConnect = connect(
  mapStateToProps,
  
);

export default compose(
  withConnect,
)(EditModal);
