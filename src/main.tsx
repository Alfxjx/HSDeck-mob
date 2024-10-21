import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import './index.css'
import { Code } from '@/pages/code.tsx';
import { Editor } from '@/pages/editor.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Code />,
      },
      {
        path: "code",
        element: <Code />,
      },
      {
        path: "editor",
        element: <Editor />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
