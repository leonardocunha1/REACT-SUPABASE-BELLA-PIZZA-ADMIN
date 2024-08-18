import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./ui/AppLayout";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Produtos from "./pages/Produtos";
import Settings from "./pages/Settings";
import Order from "./pages/Order";
import Users from "./pages/Users";
import Empty from "./ui/Empty";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import CriarPedido from "@/pages/CriarPedido";
import AreaPizzaiolo from "./pages/AreaPizzaiolo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>404 Not Found</div>,

    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />, // Redireciona da rota raiz para "/dashboard"
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "area-pizzaiolo",
        element: <AreaPizzaiolo />,
      },
      {
        path: "criarpedido",
        element: <CriarPedido />,
      },
      {
        path: "pedidos",
        element: <Orders />,
      },
      {
        path: "pedidos/:orderId",
        element: <Order />,
      },
      {
        path: "produtos",
        element: <Produtos />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "*",
        element: <Empty resourceName="Página" />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
