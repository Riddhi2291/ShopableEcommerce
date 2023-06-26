import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <Home /> },
      { index: true, element: <AdminDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;