import { Navigate, Outlet } from "react-router";
import { NavLinkEle } from "../components/NavLinkEle";
import {
  // ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoSmall from "../../public/dvd.svg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ZingMp3 } from "../components/ZingMp3";

export const ProfileLayout = () => {
  const session = useSelector((state: RootState) => state.auth.session);

  if (!session) return <Navigate to="/sign-in" replace />;

  return (
    <section className="flex h-screen w-full">
      <aside className="w-[50px] bg-sidebar-bg xl:w-[240px]">
        <ZingMp3 />
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
        {/* <NavLinkEle
          Icon={() => (
            <ChatBubbleLeftRightIcon className="size-[24px] flex-shrink-0" />
          )}
          title="Tin nhắn"
          to="conversation"
        /> */}
      </aside>
      <div className="flex-1 p-[70px]">
        <Outlet />
      </div>
    </section>
  );
};
