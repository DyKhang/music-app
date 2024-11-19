import { TooltipData, Tooltip as TooltipType } from "./Chart";

interface Props {
  tooltip: TooltipType;
  data: TooltipData | undefined;
}

export const Tooltip: React.FC<Props> = ({ tooltip, data }) => {
  if (!tooltip.isVisible || !data) return null;

  return (
    <div
      style={{
        top: tooltip.top - 50,
        left: tooltip.left - 120,
        backgroundColor: tooltip.bgColor,
      }}
      className="fixed left-0 top-0 flex items-center rounded-[4px] bg-red-800 px-[10px] py-[5px] text-white"
    >
      <img
        src={data.img}
        alt=""
        className="w-[40px] rounded-[4px] object-cover"
      />

      <div className="ml-[5px] flex flex-col">
        <span className="text-[1.2rem] font-[700]">{data.songName}</span>
        <span className="text-[1rem] text-[hsla(0,0%,100%,.8)]">
          {data.artistName}
        </span>
      </div>

      <span className="ml-[10px] text-[1.3rem] font-[700]">
        {data.percent}%
      </span>
    </div>
  );
};
