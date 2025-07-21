import React, { PropsWithChildren } from 'react';

const DropdownItem : React.FC<PropsWithChildren<{ onClick : () => void}>> = ({ onClick, children }) : JSX.Element => (
  <button className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          onClick={onClick}
          role="menuitem"
          type="button"
          tabIndex={-1}>
    {children}
  </button>);
export default DropdownItem;
