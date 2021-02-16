import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';

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
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map(
                ({ id, name, deleted_at }) => (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('categories.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                      >
                        {name}
                        {deleted_at && (
                          <Icon
                            name="trash"
                            className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                          />
                        )}
                      </InertiaLink>
                    </td>
                    
                    
                  </tr>
                )
              )}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No contacts found.
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
