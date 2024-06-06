import { BaseLayout } from "@/layouts";
import { Construction } from "./construction";
import { Projects } from "./projects";
import { NewProject } from "./projects/new-project";
import { ProjectDetails } from '@/modules/construction/projects/project-details.tsx';
import { UnitDetails } from '@/modules/construction/projects/unit-details.tsx';
import { ReserveUnit } from '@/modules/construction/projects/reserve-unit.tsx';
import { AddUnits } from '@/modules/construction/projects/add-units.tsx';
import { Samples } from '@/modules/construction/samples.tsx';
import { Buyers, NewBuyer } from '@/modules/construction/buyers';

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
    }
  ],
};
