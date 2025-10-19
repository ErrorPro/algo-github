import type { RouteObject } from "react-router-dom";
import RepositoriesListPage from "@/repository/components/RepositoryListPage";
import RepositoryPage from "@/repository/components/RepositoryPage";

export const routes: RouteObject[] = [
  {
    path: "/:org?",
    element: <RepositoriesListPage />,
  },
  {
    path: "/:org/:id",
    element: <RepositoryPage />,
  },
];
