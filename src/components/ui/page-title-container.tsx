import { ReactNode } from 'react';

const PageTitleContainer = (
  { children }: { children: ReactNode }
) => {
  return <div className="flex items-center justify-between space-y-2 mb-4">
    {children}
  </div>
    ;
}
export default PageTitleContainer;




