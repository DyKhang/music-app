import { useNavigate } from "react-router";
import { PlayList } from "../api/searchApi";

interface Props {
  data: PlayList | undefined;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchRecommendPlaylist: React.FC<Props> = ({
  data,
  setIsFocus,
}) => {
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div
      onClick={() => {
        navigate(`album/${data.encodeId}`);
        setIsFocus(false);
      }}
      className="group/recommend flex cursor-pointer items-center gap-[10px] rounded-[4px] px-[10px] py-[8px] text-[1.4rem] hover:bg-alpha-bg"
    >
      <div className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-[4px]">
        <img
          src={data.thumbnailM}
          alt=""
          className="size-[52px] object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[1.4rem] font-[500]">{data.title}</span>
        <span className="text-[1.2rem] text-text-secondary">
          Playlist • {data.artistsNames}
        </span>
      </div>
    </div>
  );
};
