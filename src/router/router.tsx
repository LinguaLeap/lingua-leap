import { createBrowserRouter } from "react-router-dom";
import WithMainLayout from "../layouts/hoc/WithMainLayout";
import Main from "../pages/main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: WithMainLayout(Main)({}),
  },
]);
