import { createBrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { loadLazy, categorizedRecipesLoader } from '../utils/index';

const queryClient = new QueryClient();

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
        loader: categorizedRecipesLoader(queryClient),
      },
      {
        path: 'login',
        element: loadLazy('Login'),
      },
      {
        path: 'register',
        element: loadLazy('Register'),
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
