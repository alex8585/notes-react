import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import SmallButton from "@/Shared/SmallButton";
import { Inertia } from '@inertiajs/inertia';
import {useState} from 'react';
import ConfirmModal from "@/Shared/Modals/ConfirmModal";
import ModalWithButtons from '@/Shared/Modals/ModalWithButtons';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import LoadingButton from '@/Shared/LoadingButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

export default () => {
  const {categories,  errors, items } = usePage().props;
  
  const {
    data,
    meta: { links }
  } = items;

  
  const [sending, setSending] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [curentItem, setcurentItem] = useState(null);

  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [viewIsOpen, setViewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  

  const [values, setValues] = useState({});
  

  let onViewOpen = (item) => {
    setcurentItem(item);
    setViewIsOpen(true)
  }

  let onConfirmIsOpen = (id) => {
      setItemId(id);
      setConfirmIsOpen(true);
  }

  let onConfirm = () => {
      Inertia.delete(route('notes.destroy', itemId));
  }

  function onEdit(item) {
    setcurentItem(item => ({...item}) );
    setValues(values => ({ ...item }));
    setEditIsOpen(true);
  }

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
  
  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    Inertia.put(route('notes.update', values.id), values, {
        preserveState: true,
        onSuccess: (page) => {
            setSending(false);
            setEditIsOpen(false);
        },
        onError: (errors) => {
            setSending(false);
        }
    });
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
              {
                data.length > 0 && data.map( item => {
                    const { id, title, category } = item;
                    return (
                        <tr
                          key={id}
                          className="hover:bg-gray-100 focus-within:bg-gray-100"
                        >
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

        <ConfirmModal
          title="Delete note ?"
          open={confirmIsOpen}
          onClose={() => setConfirmIsOpen(false)}
          onConfirm={onConfirm}
        >
          <span>Are you sure you want to delete this note?</span>
        </ConfirmModal>


        
        <ModalWithButtons
            title="Note details"
            open={viewIsOpen}
            onClose={() => setViewIsOpen(false)}
            onConfirm={() => setViewIsOpen(false)}
            
        >
            <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
                <div className='my-4'>
                  <span>id: </span>
                  <span> {curentItem ?  curentItem.id :''}</span>
                </div>
                
                <div className='my-4'>
                  <span>Note title: </span>
                  <span> {curentItem ? curentItem.title :''}</span>
                </div>
                <div className='my-4'>
                  <span>Note text: </span>
                  <span> {(curentItem && curentItem.body) ? parse(curentItem.body) : ''}</span>
                </div>

                <div className='my-4'>
                  <span>Note category: </span>
                  <span> {(curentItem && curentItem.category) ? curentItem.category.name :''}</span>
                </div>

            </div>

        </ModalWithButtons>


        <ModalWithButtons
            title="Note edit"
            open={editIsOpen}
            onClose={() => setEditIsOpen(false)}
            onConfirm={() => setEditIsOpen(false)}
            buttons={
                <React.Fragment>
                    <div className="p-1">
                    <LoadingButton
                      onClick={handleSubmit}
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

                    {/* <TextInput
                      className="w-full pb-8 pr-6 lg:w-1/2"
                      label="Note Body"
                      name="body"
                      errors={errors.body}
                      value={values.body}
                      onChange={handleChange}
                    /> */}
                </div>

              </form>

            </div>

        </ModalWithButtons>

    </Layout>
  );
};
