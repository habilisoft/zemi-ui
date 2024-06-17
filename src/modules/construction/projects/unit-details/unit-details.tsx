import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import PageTitle from '@/components/ui/page-title';
import { ProjectsService } from '@/services/projects.service.ts';
import { IBuyer, IDownPaymentResponse, IProject, IUnitResponse } from '@/types';
import { Button } from '@/components/ui/button';
import { ProjectUnitState } from '@/modules/construction/projects/components/project-unit-state';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnitGeneralInfo from '@/modules/construction/projects/unit-details/unit-general-info';
import { InstallmentsTable } from '@/modules/construction/projects/unit-details/installments-table';
import Spinner from '@/components/ui/spinner';
import ReservationAndDownPayment from '@/modules/construction/projects/unit-details/reservation-and-down-payment';

export function UnitDetails() {
  const [unit, setUnit] = useState<IUnitResponse>({} as IUnitResponse);
  const [project, setProject] = useState<IProject>({} as IProject);
  const { projectId, unitId } = useParams();
  const projectService = new ProjectsService(projectId);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(searchParams.get("tab") || "details");
  const [downPaymentInstallments, setDownPaymentInstallments] = useState([]);
  const [, setLoadingProject] = useState(true);
  const [loadingUnit, setLoadingUnit] = useState(true);
  const [buyer, setBuyer] = useState<IBuyer>({} as IBuyer);
  const [downPayment, setDownPayment] = useState<IDownPaymentResponse>({} as IDownPaymentResponse);

  useEffect(() => {
    async function fetchData() {
      const projectResponse = await projectService.getProject();
      setProject(projectResponse);
      setLoadingProject(false);
      const unitResponse = await projectService.getUnit(unitId);
      setUnit(unitResponse);
      setLoadingUnit(false);
    }
      fetchData();
  }, []);

  useEffect(() => {
    if (unit.state === 'RESERVED') {
      projectService.getUnitDownPaymentDetails(unit.name)
        .then((data) => {
          setDownPaymentInstallments(data.downPayment.installments);
          setDownPayment(data.downPayment);
          setBuyer(data.buyer);
        })
        .catch(({ response }) => {
          console.error(response?.data?.message);
        });
    }

  }, [unit]);

  useEffect(() => {
    if (selectedTab) {
      searchParams.set("tab", selectedTab);
      setSearchParams(searchParams);
    }
  }, [selectedTab]);

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Constructora", path: "/construction" },
          { label: "Proyectos", path: "/construction/projects" },
          { label: project.name, path: `/construction/projects/${project.id}/details` },
          { label: unit.name, path: `/construction/projects/1/units/${unit.name}` },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <PageTitle
            title={<div className="flex items-center space-x-4">
              <div>{unit?.name}</div>
              <ProjectUnitState state={unit.state}/></div>}
            subtitle={project.name}/>
        </div>
        <div className="space-x-2">
          {unit.state === 'RESERVED' &&
            <Button asChild><Link to={`/construction/projects/${project.id}/units/${unit.id}/down-payment-installment`}>Abonar
              a Inicial</Link></Button>}
          {unit.state === 'RESERVED' && <Button>Cancelar Reserva</Button>}
          {unit.state === 'AVAILABLE' && <Button asChild><Link
            to={`/construction/projects/${project.id}/units/${unit.id}/reserve`}>Reservar</Link></Button>}
        </div>
      </div>
      <Tabs
        onValueChange={(value) => setSelectedTab(value)}
        defaultValue={selectedTab} className="w-full">
        <div className="flex items-center justify-between space-y-2">
          <TabsList>
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="installments">Pagos</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="details">
          {loadingUnit && <Spinner/>}
          {!loadingUnit && <div className="gap-6">
            <UnitGeneralInfo unit={unit}/>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            {unit.state !== 'AVAILABLE' && <ReservationAndDownPayment downPayment={downPayment} buyer={buyer} unit={unit}/>}
          </div>}
        </TabsContent>
        <TabsContent value="installments">
          <InstallmentsTable downPaymentInstallments={downPaymentInstallments}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
