import { MainLayout } from "./ui/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Explore } from "./pages/Explore/Explore";
import { NotFound } from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Album } from "./pages/Album/Album";
import { Artist } from "./pages/Artist/Artist";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./pages/ErrorPage";
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { LayoutAllPage } from "./ui/LayoutAllPage";
import { ProfileLayout } from "./ui/ProfileLayout";
import { ProfileManage } from "./pages/ProfileManage/ProfileManage";
import { ProfileConversation } from "./pages/ProfileConversation/ProfileConversation";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => window.location.replace("/")}
      >
        <LayoutAllPage />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <SignIn />,
        path: "/sign-in",
      },
      {
        element: <SignUp />,
        path: "/sign-up",
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Explore />,
          },
          {
            path: "/album/:id",
            element: <Album />,
          },
          {
            path: "/nghe-si/:alias",
            element: <Artist />,
          },
          {
            path: "/tim-kiem",
            element: <SearchResults />,
          },
          {
            path: "/*",
            element: <NotFound />,
          },
        ],
      },
      {
        element: <ProfileLayout />,
        path: "/profile",
        children: [
          { element: <ProfileManage />, path: "manage" },
          { element: <ProfileConversation />, path: "conversation" },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
