import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard" icon="dashboard" />
      <MainMenuItem text="Categories" link="categories" icon="categories" />
      <MainMenuItem text="Notes" link="notes" icon="notes" />

      {/* <MainMenuItem text="Organizations" link="organizations" icon="office" />
      <MainMenuItem text="Contacts" link="contacts" icon="users" />
      <MainMenuItem text="Reports" link="reports" icon="printer" />
      <MainMenuItem text="Modal Demo" link="modals" icon="apple" /> */}
     
    </div>
  );
};
