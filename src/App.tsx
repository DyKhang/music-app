import { MainLayout } from "./ui/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Explore } from "./pages/Explore/Explore";
import { Library } from "./pages/Library";
import { NotFound } from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Album } from "./pages/Album/Album";
import { Artist } from "./pages/Artist/Artist";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./pages/ErrorPage";
import { SearchResults } from "./pages/SearchResults/SearchResults";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => window.location.replace("/")}
      >
        <MainLayout />
      </ErrorBoundary>
    ),
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
        path: "album/:id",
        element: <Album />,
      },
      {
        path: "nghe-si/:alias",
        element: <Artist />,
      },
      {
        path: "tim-kiem",
        element: <SearchResults />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
