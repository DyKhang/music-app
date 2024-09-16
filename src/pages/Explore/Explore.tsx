import { Carousel } from "../../components/Carousel";
import { NewReleases } from "./components/NewReleases";
export const Explore = () => {
  return (
    <>
      <Carousel />

      <div className="mt-[24px]">
        <NewReleases />
      </div>
    </>
  );
};
