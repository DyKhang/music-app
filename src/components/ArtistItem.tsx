import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useDetailArtist } from "../features/artist/useDetailArtist";
import { useNavigate } from "react-router";
import { convertTotalFollow } from "../utils/helper";

interface Props {
  alias: string;
}

export const ArtistItem: React.FC<Props> = ({ alias }) => {
  const { data } = useDetailArtist(alias);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/nghe-si/${data?.data.data.alias}`);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="group/item relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full">
        <img
          src={data?.data.data.thumbnailM}
          alt=""
          className="w-full object-cover transition-all duration-700 group-hover/item:scale-110"
        />
        <div
          className="absolute inset-0 hidden bg-black/10 group-hover/item:block"
          onClick={handleNavigate}
        ></div>
        <div className="absolute hidden size-[45px] items-center justify-center rounded-full border-[1px] border-white text-white group-hover/item:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="m400 304l48 48l-48 48m0-288l48 48l-48 48M64 352h85.19a80 80 0 0 0 66.56-35.62L256 256"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M64 160h85.19a80 80 0 0 1 66.56 35.62l80.5 120.76A80 80 0 0 0 362.81 352H416m0-192h-53.19a80 80 0 0 0-66.56 35.62L288 208"
            ></path>
          </svg>
        </div>
      </div>
      <h3
        className="mb-[4px] mt-[15px] cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d] hover:underline"
        onClick={handleNavigate}
      >
        {data?.data.data.name}
      </h3>
      <span className="text-[1.2rem] text-[#696969]">
        {`${
          data?.data.data.totalFollow &&
          convertTotalFollow(data!.data.data.totalFollow)
        }  quan tâm`}
      </span>
      <div className="mt-[15px] flex cursor-pointer items-center gap-[5px] rounded-full bg-[#644646] px-[19px] py-[6px] text-white hover:brightness-[0.9]">
        <UserPlusIcon className="size-[18px]" />
        <span className="text-[12px] uppercase">quan tâm</span>
      </div>
    </div>
  );
};
