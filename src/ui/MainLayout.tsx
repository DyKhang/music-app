import { useEffect } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { SideBar } from "./SideBar";
import { setSession } from "../features/auth/authSlice";
import { useAppDispatch } from "../store";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setSession());
  }, [dispatch]);

  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  );
};
