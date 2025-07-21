import React from "react";

type Type = {
  leftAddOn?: string
  rightAddOn?: string
  children: JSX.Element | React.FC
}
const InputWithAddOns:
  React.FC<Type & React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef((props) => {
    const { leftAddOn, rightAddOn, children } = props;

    return <div className="mt-1 flex rounded-md shadow-sm">
      <input type="text"
             className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
             placeholder="www.example.com"/>
      <span
        className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
        Semanas
      </span>
    </div>;
    return <div className="mt-1 relative rounded-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {leftAddOn && <span className="text-gray-500 sm:text-sm">{leftAddOn}</span>}
      </div>
      {children}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {rightAddOn && <span className="text-gray-500 sm:text-sm">{rightAddOn}</span>}
        </div>
    </div>
});

export default InputWithAddOns;
