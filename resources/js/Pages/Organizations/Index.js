import React, {useState} from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import SmallButton from "@/Shared/SmallButton";
import ConfirmModal from "@/Shared/Modals/ConfirmModal";
import {Inertia} from "@inertiajs/inertia";

const Organizations = () => {
  const { organizations } = usePage().props;
  const {
    data,
    meta: { links }
  } = organizations;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState(null);

  let onConfirm = () => {
      Inertia.delete(route('organizations.destroy', organizationId));
  }

  return (
    <div>
      <Helmet title="Organizations" />
      <div>
        <h1 className="mb-8 text-3xl font-bold">Organizations</h1>
        <div className="flex items-center justify-between mb-6">
          <SearchFilter />
          <InertiaLink
            className="btn-indigo focus:outline-none"
            href={route('organizations.create')}
          >
            <span>Create</span>
            <span className="hidden md:inline"> Organization</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-bold text-left">
                <th className="px-6 pt-5 pb-4">Name</th>
                <th className="px-6 pt-5 pb-4">City</th>
                <th className="px-6 pt-5 pb-4" colSpan="2">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, name, city, phone, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('organizations.edit', id)}
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
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('organizations.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {city}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('organizations.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {phone}
                      </InertiaLink>
                    </td>
                    <td className="border-t w-24 flex flex-row-reverse">
                      <SmallButton
                            onClick={()=> {
                                 setOrganizationId(id);
                                 setConfirmOpen(true);
                             }}>
                        <Icon
                            name="trash"
                            className="w-6 h-6 text-red-400 fill-current"
                        />
                      </SmallButton>

                      <InertiaLink
                        tabIndex="-1"
                        href={route('organizations.edit', id)}
                        className="px-4 mt-3"
                      >
                        <Icon
                          name="cheveron-right"
                          className="w-6 h-6 text-gray-400 fill-current"
                        />
                      </InertiaLink>
                    </td>
                  </tr>
                );
              })}
              {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination links={links} />
      </div>

      <ConfirmModal
        title="Delete item?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      >
        Are you sure you want to delete this item?
      </ConfirmModal>
    </div>
  );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Organizations.layout = page => <Layout children={page} />;

export default Organizations;
