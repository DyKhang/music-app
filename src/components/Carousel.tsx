import { useEffect, useRef } from "react";
import { getArrSlider } from "../utils/helper";
import { BannerType } from "../api/homeApi";
import { CarouselItem } from "./CarouselItem";
// import { useNavigate } from "react-router";

interface Props {
  data: BannerType | undefined;
}

export const Carousel: React.FC<Props> = ({ data }) => {
  const slideItemRef = useRef<(HTMLDivElement | null)[]>([]);

  console.log(data);

  useEffect(() => {
    const sliderEls = slideItemRef.current;
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        // Delete classnames (css)
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-9",
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10",
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10",
        );

        // Hide or Show images
        if (list.some((item) => item === i)) {
          sliderEls[i]!.style.cssText = `display: block`;
        } else {
          sliderEls[i]!.style.cssText = `display: none`;
        }
      }
      // Add animation by adding classnames
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-9",
          );
        } else if (item === min) {
          sliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10",
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10",
          );
        }
      });
      min = min === sliderEls.length - 1 ? 0 : min + 1;
      max = max === sliderEls.length - 1 ? 0 : max + 1;
    }, 10000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  if (!data?.items) return null;

  return (
    <section className="relative mt-[32px] flex overflow-hidden">
      {data?.items?.map((item, index) => (
        <CarouselItem
          key={item.encodeId}
          item={item}
          index={index}
          slideItemRef={slideItemRef}
        />
      ))}
    </section>
  );
};
