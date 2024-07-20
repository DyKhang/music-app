import { Outlet } from "react-router";

export const Main = () => {
  return (
    <div className="flex-1 overflow-y-scroll">
      <Outlet />
    </div>
  );
};
