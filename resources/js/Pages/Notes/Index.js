import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import SmallButton from "@/Shared/SmallButton";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditModal from './EditModal';
import ViewModal from './ViewModal';

export default () => {
  const {categories,  errors, items } = usePage().props;
  const { data, meta: { links } } = items;

  
  const [itemId, setItemId] = useState(null);
  const [curentItem, setcurentItem] = useState(null);

  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [viewIsOpen, setViewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  let onViewOpen = (item) => {
      setcurentItem(item);
      setViewIsOpen(true)
  }

  let onConfirmIsOpen = (id) => {
      setItemId(id);
      setConfirmIsOpen(true);
  }

  function onEdit(item) {
      setcurentItem(item);
      setEditIsOpen(true);
  }

  return (
    <Layout>
      <Helmet title="notes" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Notes</h1>
        <div className="flex items-center justify-between mb-6">

          <InertiaLink
            className="btn-indigo focus:outline-none"
            href={route('notes.create')}
          >
            <span>Create</span>
            <span className="hidden md:inline"> Note</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Id</th>
                <th className="px-6 pt-5 pb-4">Title</th>
                <th className="px-6 pt-5 pb-4">Category</th>
                <th className="px-6 pt-5 pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              { data.length > 0 && data.map( item => {
                    const { id, title, category } = item;
                    return (
                        <tr key={id}
                          className="hover:bg-gray-100 focus-within:bg-gray-100" >

                            <td className="border-t items-center px-6 py-4">
                              {id}
                            </td>
                            <td className="border-t items-center px-6 py-4">
                              {title}
                            </td>
                            <td className="border-t items-center px-6 py-4">
                              {(category && category.name) ?? ""}
                            </td>
                            <td  className="flex items-center">
                              
                              <SmallButton className="btn btn-green"
                                onClick={ ()=> onViewOpen(item)}>
                                <Icon name="view" />
                                <span>View</span>
                              </SmallButton>


                              <SmallButton className="btn btn-gray"
                                onClick={() => onEdit(item)} >
                                <Icon name="edit"/>
                                <span>Edit</span>
                              </SmallButton>
                              
                              
                              <SmallButton 
                                onClick={() => onConfirmIsOpen(id)}>
                                <Icon name="trash" />
                                <span>Delete</span>
                              </SmallButton>
                            </td>
                          
                        </tr>
                    )

                })
              }
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination links={links} />
      </div>

      <ViewModal
        viewIsOpen={viewIsOpen} 
        setViewIsOpen={setViewIsOpen}
        curentItem={curentItem}
      />

      <EditModal
        editIsOpen={editIsOpen} 
        errors={errors}
        categories={categories}
        setEditIsOpen={setEditIsOpen}
        curentItem={curentItem}
      />

      <DeleteConfirmModal 
        open={confirmIsOpen}
        itemId={itemId}
        setConfirmIsOpen={setConfirmIsOpen}
      />


    </Layout>
  );
};
