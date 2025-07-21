/* eslint-disable react/button-has-type */
import React from 'react';

const Button : React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (({ className, type = 'button', ...props }) => (
  <button type={type} className={`flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 ${className}`} {...props}/>
));

export default Button;
