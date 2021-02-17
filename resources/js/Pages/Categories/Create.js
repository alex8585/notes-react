import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';

export default () => {
  const {  errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({
    name: '',
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
    Inertia.post(route('categories.store'), values, {
      onFinish: () => setSending(false)
    });
  }

  return (
    <Layout>
      <div>
        <Helmet title="Create Contact" />
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('categories')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Categories
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Create
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
            <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
              <LoadingButton
                loading={sending}
                type="submit"
                className="btn-indigo"
              >
                Create Category
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
