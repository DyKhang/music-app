import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  Icon: React.FC;
  title: string;
}

export const NavLinkEle: React.FC<Props> = ({ to, Icon, title }) => {
  return (
    <NavLink
      to={to}
      className={`navlink flex items-center text-[1.4rem] py-[12px] px-[21px] gap-[12px] hover:text-[#614646]`}
    >
      <Icon /> {title}{" "}
      {title === "Radio" && (
        <img
          className="translate-x-[-7px]"
          src="https://zjs.zmdcdn.me/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg"
          alt=""
        />
      )}
      <PlayCircleIcon className="navlink-play-btn size-[24px] ml-auto" />
    </NavLink>
  );
};
