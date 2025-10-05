import { ChartItemChild } from "../../../api/homeApi";
import { RootState, useAppDispatch } from "../../../store";
import { getSongReducer } from "../../../features/player/playerSlice";
import { useTogglePlay } from "../../../hooks/useTogglePlay";
import { useSelector } from "react-redux";
import { currentSongSelector } from "../../../features/player/selectors";
import { AudioAnimation } from "../../../components/AudioAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: ChartItemChild;
  index: number;
  score: number;
}
const numberColors = ["#4a90e2", "#50e3c2", "#e35050"];

export const ZingChartItem: React.FC<Props> = ({ data, index, score }) => {
  const dispatch = useAppDispatch();
  const togglePlay = useTogglePlay();
  const currentSong = useSelector(currentSongSelector);
  const currentEncodeId = currentSong.encodeId;
  const currentPlay = currentEncodeId === data.encodeId;
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  function handleClickImg() {
    if (!currentPlay) {
      dispatch(getSongReducer({ id: data.encodeId, type: "play" }));
    } else {
      togglePlay();
    }
  }

  return (
    <div
      className={`group flex w-full items-center rounded-[4px] bg-[hsla(0,0%,100%,.07)] px-[15px] py-[10px] hover:bg-[hsla(0,0%,100%,.2)] ${currentPlay && "bg-[hsla(0,0%,100%,.2)]"}`}
    >
      <span
        style={{
          WebkitTextStroke: `1px ${numberColors[index]}`,
        }}
        className="text-[3.2rem] font-[900] text-[rgba(74,144,226,0)]"
      >
        {index + 1}
      </span>
      <div
        onClick={handleClickImg}
        className="relative ml-[15px] flex size-[60px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[4px]"
      >
        <img src={data.thumbnailM} alt="" className="w-full object-cover" />
        <div
          className={`absolute inset-0 bg-black/40 group-hover:block ${currentPlay ? "block" : "hidden"}`}
        ></div>
        {currentPlay && isPlaying ? (
          <AudioAnimation />
        ) : currentPlay ? (
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block"
          />
        )}
      </div>
      <div className="ml-[10px] flex flex-col">
        <span className="text-[1.4rem] font-[500] text-[hsla(0,0%,100%,.5)]">
          {data.title}
        </span>
        <span className="text-[1.2rem] text-[hsla(0,0%,100%,.5)]">
          {data.artistsNames}
        </span>
      </div>
      <span className="ml-auto text-[1.6rem] font-[700] text-white">
        {score}%
      </span>
    </div>
  );
};
