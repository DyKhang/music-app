import { PlayIcon } from "@heroicons/react/24/solid";
import { ChartItemChild } from "../../../api/homeApi";

interface Props {
  data: ChartItemChild;
  index: number;
  score: number;
}

export const ZingChartItem: React.FC<Props> = ({ data, index, score }) => {
  const numberColors = ["#4a90e2", "#50e3c2", "#e35050"];

  return (
    <div className="group/item flex w-full items-center rounded-[4px] bg-[hsla(0,0%,100%,.07)] px-[15px] py-[10px] hover:bg-[hsla(0,0%,100%,.2)]">
      <span
        style={{
          WebkitTextStroke: `1px ${numberColors[index]}`,
        }}
        className="text-[3.2rem] font-[900] text-[rgba(74,144,226,0)]"
      >
        {index + 1}
      </span>
      <div className="relative ml-[15px] flex size-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-[4px]">
        <img src={data.thumbnailM} alt="" className="w-full object-cover" />
        <div className="absolute inset-0 hidden bg-black/40 group-hover/item:block"></div>
        <PlayIcon className="translate-[-0.5px] ] absolute hidden size-[22px] text-white group-hover/item:block" />
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
