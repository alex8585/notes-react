import React, {useState, useEffect,useContext,lazy,Suspense,memo } from 'react';
import Helmet from 'react-helmet';
import {  usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import Filter from './Filter';
import SmallButton from "@/Shared/SmallButton";
import DeleteConfirmModal from "./DeleteConfirmModal";
import {connect } from 'react-redux';
import { compose } from 'redux';
import ViewModal from './ViewModal';

import { usePrevious } from 'react-use';

import Test from "@s/Test";
import {setCurrentItem, sortNotes} from './Redux/actions';
import notesReducer from './Redux/reducer.js';
import notesSaga from './Redux/saga.js';
import withReducer from "@/Hocs/withReducer"
import withSaga from "@/Hocs/withSaga"
import { getUrlQuery } from '@/utils';

const EditModal = lazy(() => import('./EditModal'));
const CreateModal = lazy(() => import('./CreateModal'));



function NotesIndex({setCurrentItem,sortNotes})  {
  

  const {categories, errors: oldErrors, items, direction:defaultDirection} = usePage().props;
  const { data, meta: { links } } = items;

  const [errors, setErrors] = useState(oldErrors);

  const [itemId, setItemId] = useState(null);
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [viewIsOpen, setViewIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);


  useEffect(() => {
    setErrors({...oldErrors});
  },[oldErrors])


 // const prevDirection = usePrevious(direction);

  // useEffect(() => {
  //   if(!prevDirection) {return}
  //   console.log('567');
  //   let query = getUrlQuery();
  //     Inertia.get(route(route().current()), {...query, direction, sort}, {
  //       //preserveScroll: true,
  //       replace: true,
  //       preserveState: true,
  //       only: ['items','flash'],
  //   });

  // },[direction, sort])

  function onCreateOpen ()  {
    setErrors({});
    setCreateIsOpen(true);
  }

  let onViewOpen = (item) => {
      setErrors({});
      setCurrentItem(item);
      setViewIsOpen(true)
  }

  let onConfirmIsOpen = (id) => {
      setErrors({});
      setItemId(id);
      setConfirmIsOpen(true);
  }

  function onEdit(item) {
      setErrors({});
      setCurrentItem(item);
      setEditIsOpen(true);
  }

  function sortHanle(e, sort) {
      e.preventDefault;
      
      let query = getUrlQuery();
      let direction = defaultDirection;

      if(query.direction) {
        direction = query.direction;
      }

      if(direction == 'asc') {
        direction = 'desc'
      } else {
        direction = 'asc'
      }

      sortNotes({...query, direction, sort });
  }

  return (
    
    <Layout>
      <Helmet title="notes" /> 
      <div>
        <h1 className="mb-8 text-3xl font-bold">Notes</h1>
        <div className="mb-6">
            <SmallButton className="btn-indigo focus:outline-none mb-5"
                onClick={onCreateOpen} >
                                
                <span>Create</span>
            </SmallButton>
            <Filter />
        </div>
        {/* <Test/> */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">
                    <a className='cursor-pointer' onClick={(e)=>sortHanle(e, 'id')}> id </a>
                </th>
                <th className="px-6 pt-5 pb-4">
                    <a className='cursor-pointer' onClick={(e)=>sortHanle(e, 'title')}> Title </a>
                </th>
                <th className="px-6 pt-5 pb-4">
                    <a className='cursor-pointer' onClick={(e)=>sortHanle(e, 'created_at')}> Create at </a>
                </th>
                <th className="px-6 pt-5 pb-4" >
                <a className='cursor-pointer' onClick={(e)=>sortHanle(e, 'category')}>Category </a> 
                </th>
                <th className="px-6 pt-5 pb-4">
                    Actions 
                </th>
              </tr>
            </thead>
            <tbody>
              { data.length > 0 && data.map( item  => {
                    const { id, title, category, created_at} = item;
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
                              {created_at}
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

      <Suspense fallback={<div>Loading...</div>}>
          <CreateModal 
            setErrors={setErrors}
            open={createIsOpen} 
            setOpen={setCreateIsOpen}
            errors={errors}
            categories={categories}
          />
          
          <EditModal 
            editIsOpen={editIsOpen} 
            errors={errors}
            categories={categories}
            setEditIsOpen={setEditIsOpen}
          />
      </Suspense>
      

      <ViewModal
        viewIsOpen={viewIsOpen} 
        setViewIsOpen={setViewIsOpen}
      />

      <DeleteConfirmModal 
        open={confirmIsOpen}
        itemId={itemId}
        setConfirmIsOpen={setConfirmIsOpen}
      />
      
    </Layout>
  );
};


const mapStateToProps = (state) => {
    return {
      currentItem: state.notes.currentItem,
    }
}

const actions = {
    setCurrentItem,
    sortNotes,
}

const withConnect = connect( mapStateToProps, actions );

export default compose(
    withReducer('notes', notesReducer), 
    withSaga('notes', notesSaga),
    withConnect,
    memo 
  )(NotesIndex);








