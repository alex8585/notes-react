import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



export default () => {
  const {categories, errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({
    title: '',
    body:'',
    category_id:'',
  });

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
      //console.log( { event, editor, data } );

      setValues(values => ({
        ...values,
        'body': data
      }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.post(route('notes.store'), values, {
      onFinish: () => setSending(false)
    });
  }



  
  return (
    <Layout>
    
      <div>
        <Helmet title="Create Note" />
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('notes')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Notes
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Create
        </h1>


        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
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
              
            
              <div className="w-full pb-8 pr-6 ">
                <CKEditor 
                    editor={ ClassicEditor }
                    data={values.body}
                    onChange={ (event, editor) => handleChangEditor( event, editor ) }
                />
                {errors.body && <div className="form-error">{errors.body}</div>}
              </div>

            </div>
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Create Note
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
