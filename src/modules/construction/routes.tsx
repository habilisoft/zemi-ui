import { Construction } from "./construction";
import { ConstructionLayout } from "./construction-layout";
import { Projects } from "./projects";

export const constructionRoutes = {
  path: "construction",
  element: <ConstructionLayout />,
  children: [
    {
      index: true,
      element: <Construction />,
    },
    {
      path: "projects",
      element: <Projects />,
    },
  ],
};
