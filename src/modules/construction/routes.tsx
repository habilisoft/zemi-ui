import { BaseLayout } from "@/layouts";
import { Construction } from "./construction";
import { Projects } from "./projects";
import { NewProject } from "./projects/new-project";
import { ProjectDetails } from '@/modules/construction/projects/project-details';
import { UnitDetails } from '@/modules/construction/projects/unit-details';
import { ReserveUnit } from '@/modules/construction/projects/reserve-unit';
import { AddUnits } from '@/modules/construction/projects/add-units';
import { Samples } from '@/modules/construction/samples';
import { Buyers, NewBuyer } from '@/modules/construction/buyers';
import { DownPaymentInstallment } from '@/modules/construction/projects/down-payment-installment';
import { BuyerDetails } from '@/modules/construction/buyers/buyer-details.tsx';
import { InitDownPaymentInstallment } from '@/modules/construction/payments/init-down-payment-installment.tsx';
import { PaymentReceipt } from '@/modules/construction/payments/payment-receipt';

const menuItems = [
  {
    title: "Dashboard",
    path: "/construction",
  },
  {
    title: "Proyectos",
    path: "/construction/projects",
  },
  {
    title: "Clientes",
    path: "/construction/buyers",
  },
  {
    title: "Pagos",
    path: "/construction/payments",
    children: [
      {
        title: "Cuotas de Inicial",
        path: "/construction/payments/down-payment-installment",
      }
    ]
  }
];

export const constructionRoutes = {
  path: "construction",
  element: <BaseLayout title="Constructora" menuItems={menuItems} />,
  children: [
    {
      index: true,
      element: <Construction />,
    },
    {
      path: "samples",
      element: <Samples />,
    },
    {
      path: "projects",
      element: <Projects />,
    },
    {
      path: "buyers",
      element: <Buyers />,
    },
    {
      path: "buyers/new",
      element: <NewBuyer />,
    },
    {
      path: "buyers/:buyerId",
      element: <BuyerDetails />,
    },
    {
      path: "projects/new",
      element: <NewProject />,
    },
    {
      path: "projects/:projectId/details",
      element: <ProjectDetails />,
    },
    {
      path: "projects/:projectId/add-units",
      element: <AddUnits />,
    },
    {
      path: "projects/:projectId/units/:unitId",
      element: <UnitDetails />,
    },
    {
      path: "projects/:projectId/units/:unitId/reserve",
      element: <ReserveUnit />,
    },
    {
      path: "projects/:projectId/units/:unitId/down-payment-installment",
      element: <DownPaymentInstallment />,
    },
    {
      path: "payments/down-payment-installment",
      element: <InitDownPaymentInstallment />,
    },
    {
      path: "payments/receipt",
      element: <PaymentReceipt />,
    }
  ],
};
