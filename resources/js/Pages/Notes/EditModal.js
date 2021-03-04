import React, {useState, useEffect } from 'react';
import UiModal from '../../Shared/UiModal';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Inertia } from '@inertiajs/inertia';

export default function EditModal(props) {
    const { editIsOpen, setEditIsOpen,  
          errors, categories, curentItem} = props;

    const [sending, setSending] = useState(false);
    const [values, setValues] = useState(curentItem);

    useEffect(()=> {
        setValues(()=>({...curentItem}))
    },[curentItem])

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }
    function handleChangEditor(event, editor) {
        const data = editor.getData();
        setValues(values => ({
            ...values,
            'body': data
        }));
    }

    function editHandleSubmit(e) {
        e.preventDefault();
        setSending(true);
    
        Inertia.put(route('notes.update', values.id), values, {
            preserveState: true,
            onSuccess: (page) => {
                setSending(false);
                setEditIsOpen(false);
            },
            onError: (errors) => {
                setEditIsOpen(false);
            },
            onFinish: (e) => {
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
            }
          
          
          >
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
                      <div className="w-full pb-8 pr-6 ">
                        <CKEditor 
                            editor={ ClassicEditor }
                            data={values.body}
                            onChange={ (event, editor) => handleChangEditor( event, editor ) }
                        />
                        {errors.body && <div className="form-error">{errors.body}</div>}
                      </div>

                  </div>

                </form>
            </div>
        </UiModal>  
        );
}