import React, { ReactNode } from 'react';
import cn from "classnames";
import { FormHelpIcon } from '@/components/ui/form-help-icon';

type Props = {
  validationError: string | undefined,
  label?: string,
  children: ReactNode,
  helpText?: string
}

const CustomFormElement:
  React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef((props) => {
  const {
    label,
    validationError = "",
    children,
    helpText
  } = props;
  return (
    <div className="w-full">
      {label && <div className="flex items-center space-x-1 h-4">
        <label className={cn("label", { "text-destructive": !!validationError })}>{label}</label>
        {helpText && <FormHelpIcon text={helpText}/>}
      </div>}
      <div className="mt-1 relative">
        {children}
      </div>
      <p className="text-sm font-medium text-destructive mt-2">{validationError}</p>
    </div>)
});

export default CustomFormElement;
