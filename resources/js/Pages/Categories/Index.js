import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import SmallButton from "@/Shared/SmallButton";
import { FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

export default () => {
  const { categories } = usePage().props;
 
  const {
    data,
    meta: { links }
  } = categories;

  return (
    <Layout>
      <Helmet title="Categories" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Categories</h1>
        <div className="flex items-center justify-between mb-6">
          
          <InertiaLink
            className="btn-indigo focus:outline-none"
            href={route('categories.create')}
          >
            <span>Create</span>
            <span className="hidden md:inline"> Category</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map(
                ({ id, name, deleted_at }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t items-center px-6 py-4">
                      {name}
                    </td>
                    <td  className="flex items-center">
                    {/* <InertiaLink
                        href={route('categories.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                      >
                      aaa
                    </InertiaLink> */}

                      <InertiaLink
                        href={route('categories.edit', id)}
                        className="btn-indigo focus:outline-none flex items-center  focus:text-indigo-700 focus:outline-none"
                      >
                       <FaEdit/> 
                          <span>Edit</span>
                      </InertiaLink>
                      <InertiaLink
                        href={route('categories.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                      >
                       <Icon
                            name="trash"
                            className="w-6 h-6 text-red-400 fill-current"
                        />
                        Delete
                      </InertiaLink>

                    </td>
                    
                  </tr>
                )
              )}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination links={links} />
      </div>
    </Layout>
  );
};
