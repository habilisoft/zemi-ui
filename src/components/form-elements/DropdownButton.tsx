import React, { PropsWithChildren } from 'react';

const DropdownButton : React.FC<PropsWithChildren> = ({ children }) => <span className="relative z-10 inline-flex shadow-sm rounded-md dropdown-button">{ children }</span>;

export default DropdownButton;
