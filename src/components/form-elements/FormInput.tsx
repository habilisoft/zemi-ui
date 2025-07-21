import React, { Ref } from 'react';

import className from "classnames";
import cn from 'classnames';
import { Input } from '@/components/ui/input.tsx';
import RequiredIndicator from '@/components/ui/required-indicator.tsx';
import { FormHelpIcon } from '@/components/ui/form-help-icon';

type FormInputType = {
  validationError: string
  label: string
  addOn?: string
  required?: boolean
  helpText?: string
}

const FormInput:
  React.FC<FormInputType & React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef((props, ref: Ref<HTMLInputElement>) => {
  const {
    type = 'text',
    label = "",
    required,
    validationError = "",
    addOn,
    helpText,
    ...op
  } = props;
  return (
    <div>
      <div className="flex items-center justify-between h-4">
        <div className="flex items-center space-x-1">
          <label className={cn("label", { "text-destructive": !!validationError })}>{label}</label>
          {helpText && <FormHelpIcon text={helpText}/>}
        </div>
        {required && <RequiredIndicator/>}
      </div>
      <div className={className({ "flex rounded-md": !!addOn })}>
        <div className={className("mt-1 relative shadow-sm", { "flex-1": !!addOn })}>
          <Input type={type}
                 className="input"
                 size={undefined}
                 aria-invalid={(!!validationError)}
                 ref={ref}
                 {...op}/>
          {/*{!!validationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <HiExclamationCircle className="h-5 w-5 text-red-500"/>
          </div>}*/}
        </div>
        {addOn && <span
          className="mt-1 inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">{addOn}</span>}
      </div>
      <p className="text-sm font-medium text-destructive mt-2">{validationError}</p>
    </div>)
});

export default FormInput;
