import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';


export default () => {

  const { category, errors } = usePage().props;
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    name: category.name || '',
  });


  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.put(route('categories.update', category.id), values, {
      onFinish: () => setSending(false)
    });
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this category?')) {
      Inertia.delete(route('categories.destroy', category.id));
    }
  }


  return (
    <Layout>
      <div>
        <Helmet title={`${values.name}`} />
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('categories')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Categories
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </h1>
        
        <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-8 -mb-8 -mr-6">
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Category name"
                name="name"
                errors={errors.name}
                value={values.name}
                onChange={handleChange}
              />
            
            </div>
            <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
              
              <DeleteButton onDelete={destroy}>Delete Category</DeleteButton>
              
              <LoadingButton
                loading={sending}
                type="submit"
                className="ml-auto btn-indigo"
              >
                Update Category
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
