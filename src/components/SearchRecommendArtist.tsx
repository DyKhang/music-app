import { useNavigate } from "react-router";
import { convertTotalFollow } from "../utils/helper";
import { Artist } from "../api/musicApi";

interface Props {
  data: Artist | undefined;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchRecommendArtist: React.FC<Props> = ({
  data,
  setIsFocus,
}) => {
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div
      onMouseDown={() => {
        navigate(`nghe-si/${data.alias}`);
        setIsFocus(false);
      }}
      className="flex cursor-pointer items-center gap-[10px] rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-black/5"
    >
      <img
        src={data.thumbnailM}
        alt=""
        className="hidden size-[52px] rounded-full object-cover lg:block"
      />
      <div className="flex flex-col">
        <span className="text-[1.4rem] font-[500]">{data.name}</span>
        <span className="text-text-secondary text-[1.2rem]">
          Nghệ sĩ • {convertTotalFollow(data.totalFollow)} quan tâm
        </span>
      </div>
    </div>
  );
};
