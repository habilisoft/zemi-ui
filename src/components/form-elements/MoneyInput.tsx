import React from 'react';
import { HiExclamationCircle } from "react-icons/hi";

import className from "classnames";

type MoneyInputType = {
    validationError: string
    label?: string
}

const MoneyInput :
    React.FC<MoneyInputType & React.InputHTMLAttributes<HTMLInputElement>> = (({
                                                                                 label,
                                                                                 validationError,
                                                                                  ...props
    }) => (

    <>
        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
      {label && <label className="label">{label}</label>}
        <div className={className("relative rounded-md shadow-sm", { "mt-1": label })}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input type="number"
                   {...props}
                   aria-invalid={!!validationError}
                   className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md text-right'"
                   placeholder="0.00" aria-describedby="price-currency"/>
            {!!validationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <HiExclamationCircle className="h-5 w-5 text-red-500" />
            </div>}
        </div>
        <p className="mt-1 text-sm text-red-600">{validationError}</p>
    </>
));

export default MoneyInput;
