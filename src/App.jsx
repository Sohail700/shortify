import './App.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import AppLayout from './layout/app-layout';
import Auth from './pages/Auth';
import Dashboard from './pages/dashboard';
import LinkPage from './pages/link';
import RedirectLink from './pages/redirect-link';
import LandingPage from './pages/landing';
import RequireAuth from './components/require-auth';
import UrlProvider from './context';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {

  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App
