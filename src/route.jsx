import { useRoutes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ReviewPage from "./pages/ReviewPage";
import RegisterPage from "./pages/RegisterPage";


export default function Router() {
  return useRoutes([
    {
      path: "",
      children: [
        {
          path: "/",
          element: <Homepage />
        },
        {
          path: "/reviews/:id",
          element: <ReviewPage />
        },
        {
          path: "/register",
          element: <RegisterPage />
        }
      ]
    }
  ])
}
