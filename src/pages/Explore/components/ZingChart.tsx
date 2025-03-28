import { PlayIcon } from "@heroicons/react/24/solid";
import { ZingChartItem } from "./ZingChartItem";
import { ChartType } from "../../../api/homeApi";
import { Chart } from "./Chart";
import { useMemo } from "react";

interface Props {
  data: ChartType | undefined;
}

export const ZingChart: React.FC<Props> = ({ data }) => {
  const scoreOfFirstThree = useMemo(() => {
    return data?.items.slice(0, 3).map((item) => item.score);
  }, [data?.items]);

  const totalScore = useMemo(() => {
    return scoreOfFirstThree?.reduce((acc, value) => {
      return (acc += value);
    }, 0);
  }, [scoreOfFirstThree]);

  const percentOfFirstThree = useMemo(() => {
    return scoreOfFirstThree?.map((score) =>
      Math.round((score / totalScore!) * 100),
    );
  }, [scoreOfFirstThree, totalScore]);

  // [{img, songName, artistName, percent}]

  const tooltipData = useMemo(() => {
    return data?.items.slice(0, 3).map((item, index) => ({
      img: item.thumbnailM,
      songName: item.title,
      artistName: item.artistsNames,
      percent: percentOfFirstThree![index],
    }));
  }, [data?.items, percentOfFirstThree]);

  if (!data) return null;

  return (
    <div className="relative mx-auto w-[90%] overflow-hidden rounded-[8px] bg-[rgba(51,16,76,.95)] p-[20px] pb-[35px] xl:mx-0 xl:w-auto">
      <div className="mb-[20px] flex items-center gap-[10px]">
        <span
          style={{
            background:
              "radial-gradient(50% 124.93% at 95.86% -10%,#3efad9 0,hsla(0,0%,100%,0) 100%),linear-gradient(91.56deg,#ff9357 1.54%,#9100ff 98.71%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-[2.8rem] font-[700] text-white"
        >
          #zingchart
        </span>
        <div className="flex size-[23px] cursor-pointer items-center justify-center rounded-full bg-white hover:brightness-[0.9]">
          <PlayIcon className="translate-[-0.5px] size-[16px] translate-x-[1px]" />
        </div>
      </div>
      <div className="flex flex-col gap-[28px] xl:flex-row">
        <div className="flex w-full flex-col items-center gap-[10px] xl:w-[42%]">
          {data?.items.map(
            (item, index) =>
              index < 3 && (
                <ZingChartItem
                  key={item.encodeId}
                  data={item}
                  index={index}
                  score={percentOfFirstThree![index]}
                />
              ),
          )}
          <div className="mt-[5px] hidden cursor-pointer rounded-full border-[1px] border-white px-[25px] py-[5px] text-[1.4rem] text-white hover:brightness-[0.9] xl:block">
            Xem thêm
          </div>
        </div>
        <Chart data={data} tooltipData={tooltipData} />
      </div>
    </div>
  );
};
