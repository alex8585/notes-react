import React, {useState,  Suspense, lazy } from 'react';
import UiModal from '../../Shared/UiModal';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import EditorInput from '@/Shared/EditorInput';

import { Inertia } from '@inertiajs/inertia';
import useEditor from "@h/useEditor";
import useFormValues from "@h/useFormValues";

function CreateModal(props) {

    const {open, setOpen, errors, categories, setErrors} = props;
    
    const [sending, setSending] = useState(false);

    
    const initialState = {
      title: '',
      category_id:'',
    }

    const [values, handleChange, resetFormValues] = useFormValues(initialState)
    const [body, handleChangEditor, resetEditor] = useEditor('');

    

    function editHandleSubmit(e) {
        e.preventDefault();
        setSending(true);
        let sendData = {
          ...values,
          body
        }
        Inertia.post(route('notes.store'), sendData, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                setOpen(false);
                resetEditor();
                resetFormValues();
                setErrors({});
            },
            onError: (errors) => {
                console.log(errors);
                setSending(false);
            }
        });
      }

    
    return (    
        <UiModal title="Create note" handleClose={ () => setOpen(false)} 
                  open={open}
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
                        value={values.category_id}
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
                          name='body'
                          className="w-full pb-8 pr-6"
                          label="Text:"
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


export default CreateModal;