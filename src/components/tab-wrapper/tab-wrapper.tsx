import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: (selectedTab: string, setSelectedTab: (value: string) => void) => ReactNode;
  defaultTab: string;
}

function TabWrapper(
  {
    children,
    defaultTab
  }: Props
) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(searchParams.get("tab") || defaultTab);

  useEffect(() => {
    if (selectedTab) {
      searchParams.set("tab", selectedTab);
      setSearchParams(searchParams);
    }
  }, [selectedTab, searchParams, setSearchParams]);

  return <>
    {children(selectedTab, setSelectedTab)}
  </>

}

export { TabWrapper }
