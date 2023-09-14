import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import ReservasPage from "./app/home/pages/Reservas";
import CadastroLogin from "./app/home/pages/Cadastro_Login";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "reservas",
    Component: ReservasPage,
  },
  {
    path: "cadastro",
    Component: CadastroLogin,
  },
  {
    path: "login",
    Component: CadastroLogin,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
