import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lobby from './pages/Lobby';
import { SocketProvider } from './context/SocketProvider';
import Room from './pages/Room';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
]);

const App = () => {
  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  );
};

export default App;