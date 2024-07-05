import { ReactNode } from 'react';

function PageWrapper({ children }: { children: ReactNode }) {
    return (
      <div className="h-full flex-1 flex-col space-y-4">
        {children}
      </div>
    );
}

export { PageWrapper }
