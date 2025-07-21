import React, { PropsWithChildren } from 'react';

const FormFeedback : React.FC<PropsWithChildren> = (({ children }) => (
  <p className="text-sm font-medium text-destructive">{children}</p>
));

export default FormFeedback;
