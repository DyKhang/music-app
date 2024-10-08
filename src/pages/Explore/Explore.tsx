import { Carousel } from "../../components/Carousel";
import { Loader } from "../../components/Loader";
import { useAlbumHot } from "../../features/home/useAlbumHot";
import { useBanner } from "../../features/home/useBanner";
import { useChills } from "../../features/home/useChills";
import { useTop100 } from "../../features/home/useTop100";
import { useTrending } from "../../features/home/useTrending";
import { NewReleaseList } from "./components/NewReleaseList";
import { PlayList } from "./components/PlayList";
export const Explore = () => {
  const { data: bannerData, isLoading: bannerLoading } = useBanner();
  const { data: trendingData, isLoading: trendingLoading } = useTrending();
  const { data: chills, isLoading: chillsLoading } = useChills();
  const { data: top100, isLoading: top100Loading } = useTop100();
  const { data: albumHot, isLoading: albumHotLoading } = useAlbumHot();

  if (
    bannerLoading ||
    trendingLoading ||
    chillsLoading ||
    albumHotLoading ||
    top100Loading
  )
    return <Loader />;

  return (
    <section className="pt-[70px]">
      <Carousel data={bannerData} />
      <div className="mt-[48px]">
        <NewReleaseList />
      </div>

      <div className="mt-[48px]">
        <PlayList data={trendingData} />
      </div>

      <div className="mt-[48px]">
        <PlayList data={chills} hasLink />
      </div>

      <div className="mt-[48px]">
        <PlayList data={top100} isAlbum hasLink />
      </div>

      <div className="mt-[48px]">
        <PlayList data={albumHot} isAlbum />
      </div>
    </section>
  );
};
