import { createBrowserRouter } from 'react-router-dom';
import { loadLazy } from '../utils/loadLazy';

const router = createBrowserRouter([
  {
    path: '/',
    element: loadLazy('Root'),
    children: [
      {
        path: '/',
        element: loadLazy('Home'),
      },
      {
        path: 'main',
        element: loadLazy('Main'),
      },
      {
        path: 'signin',
        element: loadLazy('SignIn'),
      },
      {
        path: 'signup',
        element: loadLazy('SignUp'),
      },
      {
        path: 'dashboard',
        element: loadLazy('DashBoard'),
      },
      {
        path: 'about',
        element: loadLazy('About'),
      },
      {
        path: 'search',
        element: loadLazy('Search'),
      },
    ],
  },
]);

export default router;
