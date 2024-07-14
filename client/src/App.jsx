import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lobby from './pages/Lobby';
import { SocketProvider } from './context/SocketProvider';
import Room from './pages/Room';
import VideoEnded from './pages/VideoEnded';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  },
  {
    path: '/video-ended',
    element: <VideoEnded />
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
