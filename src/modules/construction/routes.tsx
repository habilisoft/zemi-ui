import { BaseLayout } from "@/layouts";
import { Construction } from "./construction";
import { Projects } from "./projects";
import { NewProject } from "./projects/new-project";

const menuItems = [
  {
    title: "Dashboard",
    path: "/construction",
  },
  {
    title: "Proyectos",
    path: "/construction/projects",
  },
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
      path: "projects",
      element: <Projects />,
    },
    {
      path: "projects/new",
      element: <NewProject />,
    },
  ],
};
