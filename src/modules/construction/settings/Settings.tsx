import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useState } from 'react';
import { DocumentTemplates } from '@/modules/construction/settings/documents-templates/document-templates.tsx';
import { PageWrapper } from '@/components/ui/page-wrapper.tsx';

function Settings() {
  const [selectedTab, setSelectedTab] = useState('general');
  return (
    <PageWrapper>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Configuración", path: "/construction/settings" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Configuración" subtitle="Constructora"/>
      </div>
      <Tabs
        onValueChange={(value) => setSelectedTab(value)}
        defaultValue={selectedTab} className="w-full">
        <div className="flex items-center justify-between space-y-2">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="accounting">Contabilidad</TabsTrigger>
            <TabsTrigger value="documents-templates">Plantillas de documentos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general">
          General
        </TabsContent>
        <TabsContent value="accounting">
          Accounting
        </TabsContent>
        <TabsContent value="documents-templates">
          <DocumentTemplates/>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  )
}

export { Settings }
