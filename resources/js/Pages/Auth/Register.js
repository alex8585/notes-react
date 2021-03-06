import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import Logo from '@/Shared/Logo';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';

export default () => {
  const { errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({
    name:'',
    email: '',
    password: '',
    password_confirmation:''
  });

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.post(route('register'), values, {
      onFinish: () => setSending(false)
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-indigo-900">
      <Helmet title="Login" />
      <div className="w-full max-w-md">
        <Logo
          className="block w-full max-w-xs mx-auto text-white fill-current"
          height={50}
        />
        <form
          onSubmit={handleSubmit}
          className="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
        >
          <div className="px-10 py-12">
            <h1 className="text-3xl font-bold text-center">Registration</h1>
            <div className="w-24 mx-auto mt-6 border-b-2" />

            <TextInput
              className="mt-10"
              label="Name"
              name="name"
              type="text"
              errors={errors.name}
              value={values.name}
              onChange={handleChange}
            />

            <TextInput
              className="mt-10"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              className="mt-6"
              label="Password"
              name="password"
              type="password"
              errors={errors.password}
              value={values.password}
              onChange={handleChange}
            />
            <TextInput
              className="mt-6"
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              errors={errors.password_confirmation}
              value={values.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
            <a className="hover:underline" tabIndex="-1" href="#reset-password">
              Forgot password?
            </a>
            <LoadingButton
              type="submit"
              loading={sending}
              className="btn-indigo"
            >
              Register
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};
