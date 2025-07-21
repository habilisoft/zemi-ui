import React from 'react';
import { HiExclamationCircle } from "react-icons/hi";
//import InputMask from "react-input-mask";

type MaskedFormInputType = {
  invalid: boolean,
  validationError: string
  label: string
  mask: string
}

const MaskedFormInput:
  React.FC<MaskedFormInputType & React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef((props) => {
  const {
    type = 'text',
    label = "",
    mask,
    validationError = "",
    ...op
  } = props;
  return (
    <div>
      <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
      <label className="label">{label}</label>
      <div className="mt-1 relative shadow-sm">
       {/* <InputMask type={type}
                   mask={mask}
                   aria-invalid={!!validationError}
               {...op}/>*/}
        {!!validationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <HiExclamationCircle className="h-5 w-5 text-red-500"/>
        </div>}
      </div>
      <p className="mt-2 text-sm text-red-600">{validationError}</p>
    </div>)
});

export default MaskedFormInput;
