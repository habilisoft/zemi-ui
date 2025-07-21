import { ReactNode } from 'react';

export const SectionTitle = ({ children } : { children : ReactNode}) => {
  return (
    <h2 className="text-lg font-semibold text-gray-600">{children}</h2>
  )
}
