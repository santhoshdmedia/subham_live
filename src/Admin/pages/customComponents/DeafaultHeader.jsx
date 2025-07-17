 import { Tag, Input } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';  
import React from 'react';

const DefaultHeader = ({
  pageName,
  icon,
  add = true,
  addStatus,
  setAddStatus,
  search = true,
  text,
  setSearch,
  model,
}) => {
  return (
    <div className="flex items-center justify-between mb-2 shadow py-4 border border-slate-50 px-4">
       <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <h1 className="text-2xl font-bold">{pageName}</h1>
      </div>

       <div className="flex items-center gap-x-2">
        {add && (
          <Tag
            onClick={() => {
              setAddStatus(!addStatus);
            }}
            className={`${
              !addStatus ? 'bg-secondary' : 'bg-[#6b7280] ' + (model ? 'hidden' : '')
            } text-white border-none px-3 !font-primary_font py-1 rounded cursor-pointer`}
          >
            <div className="center_div gap-x-1">{!addStatus ? text : 'Cancel'}</div>
          </Tag>
        )}

        {search && (
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={`Search ${pageName}`} 
            suffix={<IoSearchOutline className="cursor-text" />}
            className="!shadow-inner !mx-2 cursor-text"
          />
        )}
      </div>
    </div>
  );
};

export default DefaultHeader;
