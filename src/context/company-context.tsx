import { ICompanyInformation } from '@/types';
import React, { createContext, useEffect } from 'react';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { CompanyService } from '@/services/company.service.ts';

type Props = {
  company: ICompanyInformation | null;
}

const CompanyInfoContext = createContext<Props>({} as Props);

const CompanyInfoProvider = ({ children } : { children: React.ReactNode }) => {
  const companyService = new CompanyService();
  const {
    setCompanyInfo,
    company,
    setCompanyInfoLoaded
  } = useCompoundStore(
    (state) => ({
      setCompanyInfo: state.setCompanyInfo,
      company: state.companyInfo,
      setCompanyInfoLoaded: state.setCompanyInfoLoaded,
    }),
    shallow
  );

  useEffect(() => {
    companyService.getCompanyInfo().then((company) => {
      setCompanyInfo(company);
      setCompanyInfoLoaded(true);
    });
  }, []);

  return (
    <CompanyInfoContext.Provider value={{ company }}>
      {children}
    </CompanyInfoContext.Provider>
  );

}

const CompanyInfoConsumer = CompanyInfoContext.Consumer;
export { CompanyInfoConsumer, CompanyInfoProvider, CompanyInfoContext };
