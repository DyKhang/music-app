import { useEffect, useState } from "react";
import { useHome } from "../features/home/useHome";

const SliderTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(0);

  const { data } = useHome();

  const slides = data?.items || [];
  const slidesToShow = 3;
  const totalSlides = slides.length;

  useEffect(() => {
    setTranslate(-currentIndex * (100 / slidesToShow));
  }, [currentIndex, slidesToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalSlides - slidesToShow ? 0 : prevIndex + slidesToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - slidesToShow : prevIndex - slidesToShow
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(${translate}%)`,
          width: `${(totalSlides * 100) / slidesToShow}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="h-64 bg-center bg-cover"
            style={{
              backgroundImage: `url(${slide.banner})`,
              minWidth: `${100 / slidesToShow}%`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer"
        onClick={prevSlide}
      >
        {"<"}
      </div>
      <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer"
        onClick={nextSlide}
      >
        {">"}
      </div>
    </div>
  );
};

export default SliderTest;
