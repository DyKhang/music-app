import { MainLayout } from "./ui/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Explore } from "./pages/Explore";
import { Library } from "./pages/Library";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Explore />,
      },
      {
        path: "mymusic",
        element: <Library />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
