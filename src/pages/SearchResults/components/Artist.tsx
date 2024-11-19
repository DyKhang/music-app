import { useNavigate } from "react-router";
import { convertTotalFollow } from "../../../utils/helper";

interface Props {
  item:
    | {
        name: string;
        totalFollow: number;
        thumbnailM: string;
        alias: string;
      }
    | undefined;
}

export const Artist: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  return (
    <div
      onClick={() => navigate(`/nghe-si/${item.alias}`)}
      className="group/artist flex cursor-pointer items-center gap-[16px] rounded-[5px] bg-[rgba(254,255,255,0.3)] p-[10px]"
    >
      <div className="group/img relative flex size-[84px] items-center justify-center overflow-hidden rounded-full">
        <img
          src={item.thumbnailM}
          alt=""
          className="w-full object-cover transition-all duration-500 group-hover/img:scale-110"
        />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/artist:block"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28px"
          height="28px"
          viewBox="0 0 512 512"
          className="absolute hidden group-hover/artist:block"
        >
          <path
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="m400 304l48 48l-48 48m0-288l48 48l-48 48M64 352h85.19a80 80 0 0 0 66.56-35.62L256 256"
          ></path>
          <path
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M64 160h85.19a80 80 0 0 1 66.56 35.62l80.5 120.76A80 80 0 0 0 362.81 352H416m0-192h-53.19a80 80 0 0 0-66.56 35.62L288 208"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="mb-[6px] text-[1.2rem] text-[#696969]">Nghệ sĩ</span>
        <span className="text-[1.4rem] font-[600] uppercase hover:text-[#844d4d] hover:underline">
          {item.name}
        </span>
        <span className="mt-[2px] text-[1.2rem] text-[#696969]">
          {convertTotalFollow(item.totalFollow)} quan tâm
        </span>
      </div>
    </div>
  );
};
