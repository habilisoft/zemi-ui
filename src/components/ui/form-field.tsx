import { FieldError, UseFormRegister } from "react-hook-form";
import { FC } from 'react';

type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

const FormField: FC<FormFieldProps> = ({
                                               type,
                                               placeholder,
                                               name,
                                               register,
                                               error,
                                               valueAsNumber,
                                             }) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
