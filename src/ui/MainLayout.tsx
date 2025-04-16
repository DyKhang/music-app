import { useEffect } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { SideBar } from "./SideBar";
import { userApi } from "../api/userApi";
import { useAuth } from "../hooks/useAuth";

export const MainLayout = () => {
  const { setSession } = useAuth();

  useEffect(() => {
    userApi.me().then(({ data }) => {
      if ("email" in data) {
        setSession(data);
        localStorage.setItem("session", JSON.stringify(data));
      } else setSession(null);
    });
  }, [setSession]);

  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  );
};
