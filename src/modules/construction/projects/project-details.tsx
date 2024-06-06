import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProjectsService } from '@/services/projects.service.ts';
import { useEffect, useState } from 'react';
import { IProject } from '@/types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Overlay from '@/components/overlay';
import PageTitle from '@/components/ui/page-title.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { ProjectUnits } from '@/modules/construction/projects/project-units.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';

export function ProjectDetails() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const projectsService = new ProjectsService(projectId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(searchParams.get("tab") || "details");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [unitsToAdd, setUnitsToAdd] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    projectsService.getProject()
      .then((projectData) => {
        setLoading(false);
        setProject(projectData);
      })
      .catch(({ response }) => {
        setError(response?.data?.message)
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    if (selectedTab) {
      searchParams.set("tab", selectedTab);
      setSearchParams(searchParams);
    }
  }, [selectedTab]);

  if (loading) return <Overlay show={true} text="Cargando..."/>;
  if (error) return <ClosableAlert color="danger">Error al cargar el proyecto</ClosableAlert>;

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Dialog
        isOpen={dialogIsOpen}
        close={() => setDialogIsOpen(false)}
        title="Cuantas unidades desea agregar?"
      >
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            onChange={(e) => setUnitsToAdd(parseInt(e.target.value) || 0)}
            value={unitsToAdd}
            placeholder="Cantidad"
            className="w-32"
          />
          <Button
            onClick={()=>navigate(`/construction/projects/${projectId}/add-units`, { state: { project, unitsToAdd } })}
            disabled={unitsToAdd < 1}>
            Agregar
          </Button>
        </div>
      </Dialog>
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: project?.name || "", path: "/construction/projects/new" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageTitle title={project?.name}/>
        </div>

      </div>

      <Tabs
        onValueChange={(value) => setSelectedTab(value)}
        defaultValue={selectedTab} className="w-full">
        <div className="flex items-center justify-between space-y-2">
          <TabsList>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="units">Unidades</TabsTrigger>
          </TabsList>
          {selectedTab === 'units' && <Button
            onClick={() => setDialogIsOpen(true)}
            className="h-8">
            <Plus className="size-4 mr-2"/> Agregar unidades
          </Button>}
        </div>
        <TabsContent value="details">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="units">
          <ProjectUnits project={project}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
