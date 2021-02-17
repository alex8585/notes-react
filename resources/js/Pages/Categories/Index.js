import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import SmallButton from "@/Shared/SmallButton";
import DeleteButton from '@/Shared/DeleteButton';
import { Inertia } from '@inertiajs/inertia';
import {useState} from 'react';
import ConfirmModal from "@/Shared/Modals/ConfirmModal";

export default () => {
  const { categories } = usePage().props;
 
  const {
    data,
    meta: { links }
  } = categories;

  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  let onConfirmOpen = (id) => {
      setCategoryId(id);
      setConfirmOpen(true);
  }


  let onConfirm = () => {
      Inertia.delete(route('categories.destroy', categoryId));
  }


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
                      <InertiaLink className="btn btn-gray" href={route('categories.edit', id)}>
                        <Icon name="edit"/>
                        <span>Edit</span>
                      </InertiaLink>

                      
                      <InertiaLink className="btn btn-green" href={route('categories.edit', id)} >
                        <Icon name="view" />
                        <span>View</span>
                      </InertiaLink>
                     
                      <SmallButton 
                            onClick={() => onConfirmOpen(id)}>
                        <Icon
                            name="trash"
                        />
                        <span>Delete</span>
                      </SmallButton>
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

      <ConfirmModal
        title="Delete category ?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      >
        Are you sure you want to delete this category?
      </ConfirmModal>

    </Layout>
  );
};
