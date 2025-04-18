import {
  ArrowLeftStartOnRectangleIcon,
  ArrowUpOnSquareIcon,
  HeartIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { HoverTag } from "./HoverTag";
import { useNavigate } from "react-router";
import { userApi, UserSession } from "../api/userApi";
import { useAppDispatch } from "../store";
import { logout } from "../features/auth/authSlice";

type Props = {
  session: UserSession | null;
};

export const POAvatar: React.FC<Props> = ({ session }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="w-[250px] p-[8px]">
      {session && (
        <>
          <div className="flex items-center gap-[12px]">
            <img
              src={
                session.avatar
                  ? session.avatar
                  : "https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.13.11/static/media/user-default.3ff115bb.png"
              }
              alt="avatar"
              className="aspect-square w-[23%] rounded-full object-cover"
            />

            <div className="flex w-[70%] flex-col">
              <span className="truncate font-[700]">{session.username}</span>
              <span className="truncate text-[1.4rem] text-[#a1a1a1]">
                {session.email}
              </span>
            </div>
          </div>

          <div className="my-[12px] h-[1px] bg-[#0000001a]"></div>
        </>
      )}

      {session && (
        <>
          <HoverTag title="Trang cá nhân" LeftIcon={() => <UserCircleIcon />} />
          <HoverTag
            title="Danh sách yêu thích"
            LeftIcon={() => <HeartIcon />}
          />
          <HoverTag title="Tải lên" LeftIcon={() => <ArrowUpOnSquareIcon />} />

          <div className="my-[4px] h-[1px] bg-[#0000001a]"></div>
          <HoverTag
            title="Đăng xuất"
            onClick={async () => {
              await userApi.logout();
              dispatch(logout());
            }}
            LeftIcon={() => <ArrowLeftStartOnRectangleIcon />}
          />
        </>
      )}

      {!session && (
        <>
          <HoverTag
            title="Đăng nhập"
            LeftIcon={() => <UserCircleIcon />}
            onClick={() => navigate("/sign-in")}
          />

          <HoverTag
            title="Đăng ký"
            LeftIcon={() => <PlusCircleIcon />}
            onClick={() => navigate("sign-up")}
          />
        </>
      )}
    </div>
  );
};
