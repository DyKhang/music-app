import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export const useAuth = () => {
  const session = useContext(AuthContext)!;

  return session;
};
