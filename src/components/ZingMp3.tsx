import { Link } from "react-router-dom";
import logoLight from "/logo-light.svg";
import logoDark from "/logo-dark.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ZingMp3 = () => {
  const isDark =
    useSelector((state: RootState) => state.theme.current.type) === "dark";
  return (
    <Link
      to="/"
      className="hidden items-center justify-center p-5 opacity-90 transition-opacity duration-[0.5s] hover:opacity-100 xl:flex"
    >
      <img
        src={isDark ? logoDark : logoLight}
        alt=""
        className="w-[150px] object-cover"
      />
    </Link>
  );
};
