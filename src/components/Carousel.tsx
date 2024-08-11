import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useHome } from "../features/home/useHome";
import { useEffect, useRef } from "react";

export const Carousel = () => {
  const { data, isPending } = useHome();
  const slideItemRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let min = 0;
    let max = 2;

    const timerId = setInterval(() => {
      slideItemRef.current.forEach((item, index) => {
        if (index <= max && index >= min && item) {
          item.style.display = "block";
        } else {
          if (item) {
            item.style.display = "none";
          }
        }
      });
      min++;
      max++;
      if (data && data.items) {
        if (max > data.items.length - 1) {
          max = 2;
          min = 0;
        }
      }
      console.log(`min: ${min}, max: ${max}`);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [data]);

  return isPending ? (
    "is loading..."
  ) : (
    <div>
      <section className="group/slider flex mt-24 overflow-hidden relative">
        <div className="group-hover/slider:visible invisible size-[55px] hover:opacity-100 cursor-pointer bg-button-slider absolute flex justify-center items-center rounded-full top-[50%] translate-y-[-50%] left-11">
          <ChevronLeftIcon className="size-[40px] text-white " />{" "}
        </div>
        {data?.items?.map((item, index) => (
          <div
            className="slider-item w-[33.3%] flex-shrink-0 px-[15px]"
            key={item.banner}
            ref={(el) => (slideItemRef.current[index] = el)}
          >
            <img
              src={item.banner}
              className="object-cover rounded-[8px] w-full"
            />
          </div>
        ))}
        <div className="group-hover/slider:visible invisible size-[55px] cursor-pointer hover:opacity-100 bg-button-slider absolute flex justify-center items-center rounded-full top-[50%] translate-y-[-50%] right-11">
          <ChevronRightIcon className="size-[40px] text-white " />
        </div>
      </section>
    </div>
  );
};
