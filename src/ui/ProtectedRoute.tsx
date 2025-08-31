import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const session = useSelector((state: RootState) => state.auth.session);

  if (!session) return <Navigate to="/" replace />;

  return <Outlet />;
};
