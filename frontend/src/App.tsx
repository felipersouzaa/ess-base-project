import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import ReservasPage from "./app/home/pages/Reservas";
<<<<<<< Updated upstream
import CadastroLogin from "./app/home/pages/Cadastro_Login";
=======
import AvaliaPage from "./app/home/pages/Avalia";
import UserHistoryList from "./app/home/pages/Favorito"
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    path: "cadastro",
    Component: CadastroLogin,
  },
  {
    path: "login",
    Component: CadastroLogin,
=======
    path: "/Avalia",
    Component: AvaliaPage,
  },
  {
    path: "/Favorito",
    Component: UserHistoryList
>>>>>>> Stashed changes
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
