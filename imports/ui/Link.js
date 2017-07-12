import React from 'react';
import LinkList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default ()=>{
  return (
    <div className="">
      <PrivateHeader title="Your Links"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinkList/>
      </div>
    </div>
  );
};
