import React, { useState } from "react";
import { TopSongsItemChild } from "../../../api/homeApi";
import { TopNewSongCarouselItem } from "./TopNewSongCarouselItem";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  items: TopSongsItemChild[] | undefined;
}

const NextArrow = ({
  onClick,
  atEnded,
}: {
  onClick?: () => void;
  atEnded: boolean;
}) => {
  return (
    <div
      style={{
        boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
      }}
      className={`absolute right-[-9px] top-1/2 z-[1] flex size-[38px] -translate-y-1/2 items-center justify-center rounded-full bg-white hover:brightness-[0.9] ${atEnded ? "cursor-default select-none opacity-[0.1]" : "cursor-pointer"}`}
      onClick={onClick}
    >
      <ChevronRightIcon className="size-[22px]" />
    </div>
  );
};

const PreviousArrow = ({
  onClick,
  atInitial,
}: {
  onClick?: () => void;
  atInitial: boolean;
}) => {
  return (
    <div
      style={{
        boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
      }}
      className={`absolute left-[-9px] top-1/2 z-[1] flex size-[38px] -translate-y-1/2 items-center justify-center rounded-full bg-white hover:brightness-[0.9] ${atInitial ? "cursor-default select-none opacity-[0.1]" : "cursor-pointer"}`}
      onClick={onClick}
    >
      <ChevronLeftIcon className="size-[22px]" />
    </div>
  );
};

export const TopNewSongsCarousel: React.FC<Props> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const atInitial = currentSlide === 0;
  const atEnded = currentSlide === 5;

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    afterChange(currentSlide) {
      setCurrentSlide(currentSlide);
    },
    nextArrow: <NextArrow atEnded={atEnded} />,
    prevArrow: <PreviousArrow atInitial={atInitial} />,
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      {items?.map((item, index) => (
        <TopNewSongCarouselItem key={item.encodeId} item={item} index={index} />
      ))}
    </Slider>
  );
};
