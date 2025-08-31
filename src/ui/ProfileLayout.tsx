import { Navigate, Outlet } from "react-router";
import { NavLinkEle } from "../components/NavLinkEle";
import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../../public/logo-light.svg";
import logoSmall from "../../public/logo-small.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ProfileLayout = () => {
  const session = useSelector((state: RootState) => state.auth.session);

  if (!session) return <Navigate to="/sign-in" replace />;

  return (
    <section className="flex h-screen w-full">
      <aside className="w-[50px] bg-[#f2f2f2] xl:w-[240px] xl:bg-[#d9d7d4]">
        <Link
          to="/"
          className="hidden items-center justify-center p-5 opacity-80 transition-opacity duration-[0.5s] hover:opacity-100 xl:flex"
        >
          <img src={logo} alt="" className="w-[150px] object-cover" />
        </Link>
        <Link
          to="/"
          className="flex items-center justify-center p-5 opacity-80 transition-opacity duration-[0.5s] hover:opacity-100 xl:hidden"
        >
          <img src={logoSmall} alt="" className="object-cover" />
        </Link>
        <NavLinkEle
          Icon={() => <UserIcon className="size-[24px] flex-shrink-0" />}
          title="Thông tin cá nhân"
          to="manage"
        />
        <NavLinkEle
          Icon={() => <ShieldCheckIcon className="size-[24px] flex-shrink-0" />}
          title="Bảo mật"
          to="secure"
        />
        <NavLinkEle
          Icon={() => (
            <ChatBubbleLeftRightIcon className="size-[24px] flex-shrink-0" />
          )}
          title="Tin nhắn"
          to="conversation"
        />
      </aside>
      <div className="flex-1 p-[70px]">
        <Outlet />
      </div>
    </section>
  );
};
