import React, { Ref } from 'react';
import { HiExclamationCircle } from "react-icons/hi";

type FormInputType = {
  invalid: boolean,
  validationError: string
  label: string,
  addOn?: string
}

const Input:
  React.FC<FormInputType & React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef((props, ref: Ref<HTMLInputElement>) => {
  const {
    type = 'text',
    validationError = "",
    addOn,
    ...op
  } = props;
  return (
    <div>
      <input type={type}
             className="input"
             aria-invalid={(!!validationError)}
             ref={ref}
             {...op}/>
      {!!validationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <HiExclamationCircle className="h-5 w-5 text-red-500"/>
      </div>}
      <p className="mt-1 text-sm text-red-600">{validationError}</p>
    </div>)
});

export default Input;
