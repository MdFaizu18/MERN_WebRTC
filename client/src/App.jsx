// to importing the necessary packages and routes
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Lobby from './pages/Lobby';
import { SocketProvider } from './context/SocketProvider';
import Room from './pages/Room';
import VideoEnded from './pages/VideoEnded';

// creating the navigating routes
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

// rendering the route via socketprovider
const App = () => {
  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  );
};

export default App;
