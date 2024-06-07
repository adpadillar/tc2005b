import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import UserPage from "./pages/User";
import Navigation from "./components/custom/Navigation";
import { Toaster } from "./components/ui/toaster";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/user/:userid",
    element: <UserPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Navigation />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
