import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';

// 路由配置
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
      // 可以在这里添加更多路由
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />,
      //   // 可以添加子路由
      //   children: [
      //     { path: 'profile', element: <Profile /> },
      //     { path: 'settings', element: <Settings /> },
      //   ],
      // },
    ],
  },
]);

export default router; 