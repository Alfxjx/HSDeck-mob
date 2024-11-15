import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import './index.css';
import { Editor } from '@/pages/editor/index.tsx';
import { CodeV2 } from './pages/code/index.tsx';
import { CodeV2Input } from './pages/code/input.tsx';
import { CodeV2Result } from './pages/code/result.tsx';

const basename = import.meta.env.VITE_BASE_PATH || '/';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CodeV2 />,
        children: [
          {
            path: '/',
            element: <CodeV2Input />
          },
          {
            path: 'code/input',
            element: <CodeV2Input />
          },
          {
            path: 'code/result',
            element: <CodeV2Result />
          }
        ]
      },
      {
        path: "editor",
        element: <Editor />,
      },
    ]
  },
], {
  basename: basename,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
