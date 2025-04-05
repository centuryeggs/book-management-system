import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';

// Route configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      // Add more routes here
      // {
      //   path: '/example',
      //   element: <Example />,
      //   // You can add child routes here
      // },
    ],
  },
]);

export default router; 