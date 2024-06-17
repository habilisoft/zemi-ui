import { ReactNode } from 'react';

const PageTitle = ({ title, subtitle } : { title : string | undefined | ReactNode, subtitle?: string | undefined}) => {
  return <div>
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <p className="text-muted-foreground">{subtitle}</p>
    </div>
    ;
}
export default PageTitle;
