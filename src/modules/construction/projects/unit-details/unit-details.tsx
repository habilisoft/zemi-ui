import {Link, useParams, useSearchParams} from 'react-router-dom';
import {Fragment, useEffect, useState} from 'react';
import {Breadcrumb} from '@/components/ui/breadcrumb';
import PageTitle from '@/components/ui/page-title';
import {ProjectsService} from '@/services/projects.service.ts';
import {
    IDownPaymentResponse,
    IUnitDetailResponse
} from '@/types';
import {Button} from '@/components/ui/button';
import {ProjectUnitState} from '@/modules/construction/projects/components/project-unit-state';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import UnitGeneralInfo from '@/modules/construction/projects/unit-details/unit-general-info';
import {InstallmentsTable} from '@/modules/construction/projects/unit-details/installments-table';
import Spinner from '@/components/ui/spinner';
import ReservationAndDownPayment from '@/modules/construction/projects/unit-details/reservation-and-down-payment';

export function UnitDetails() {
    const [unit, setUnit] = useState<IUnitDetailResponse>({} as IUnitDetailResponse);
    const {projectId, unitId} = useParams();
    const projectService = new ProjectsService(projectId);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(searchParams.get("tab") || "details");
    const [loadingUnit, setLoadingUnit] = useState(true);
    const [downPayment, setDownPayment] = useState<IDownPaymentResponse>({} as IDownPaymentResponse);

    useEffect(() => {
        async function fetchData() {
            const unitResponse = await projectService.getUnit(unitId);
            if (unitResponse.state != 'AVAILABLE' && unitResponse.downPayment) {
                const downPayment = unitResponse.downPayment;
                setDownPayment(downPayment);
            }
            setUnit(unitResponse);
            setLoadingUnit(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedTab) {
            searchParams.set("tab", selectedTab);
            setSearchParams(searchParams);
        }
    }, [selectedTab]);

    return (
        <Fragment>
            {loadingUnit && <Spinner/>}
            {!loadingUnit && <div className="h-full flex-1 flex-col space-y-4">
                <Breadcrumb
                    items={[
                        {label: "Constructora", path: "/construction"},
                        {label: "Proyectos", path: "/construction/projects"},
                        {label: unit.project.name, path: `/construction/projects/${unit.project.id}/details`},
                        {label: unit.name, path: `/construction/projects/${unit.project.id}/units/${unit.name}`},
                    ]}
                />
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <PageTitle
                            title={<div className="flex items-center space-x-4">
                                <div>{unit?.name}</div>
                                <ProjectUnitState state={unit.state}/></div>}
                            subtitle={unit.project.name}/>
                    </div>
                    <div className="space-x-2">
                        {unit.state === 'RESERVED' &&
                            <Button asChild><Link
                                to={`/construction/projects/${unit.project.id}/units/${unit.id}/down-payment-installment`}>Abonar
                                a Inicial</Link></Button>}
                        {unit.state === 'RESERVED' && <Button>Cancelar Reserva</Button>}
                        {unit.state === 'AVAILABLE' && <Button asChild><Link
                            to={`/construction/projects/${unit.project.id}/units/${unit.id}/reserve`}>Reservar</Link></Button>}
                    </div>
                </div>
                <Tabs
                    onValueChange={(value) => setSelectedTab(value)}
                    defaultValue={selectedTab} className="w-full">
                    <div className="flex items-center justify-between space-y-2">
                        <TabsList>
                            <TabsTrigger value="details">Detalles</TabsTrigger>
                            <TabsTrigger value="installments">Pagos</TabsTrigger>
                            <TabsTrigger value="documents">Documentos</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="details">
                        <div className="gap-6">
                            <UnitGeneralInfo unit={unit}/>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                            {unit.state !== 'AVAILABLE' &&
                                <ReservationAndDownPayment unit={unit}/>}
                        </div>
                    </TabsContent>
                    <TabsContent value="installments">
                        <InstallmentsTable downPayment={downPayment}/>
                    </TabsContent>
                    <TabsContent value="documents">
                        <div>Documents</div>
                    </TabsContent>
                </Tabs>
            </div>}
        </Fragment>
    );
}
