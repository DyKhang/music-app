import { Loader } from "../../components/Loader";
import { useAlbumHot } from "../../features/home/useAlbumHot";
import { useChart } from "../../features/home/useChart";
import { useChills } from "../../features/home/useChills";
import { useNewRelease } from "../../features/home/useNewReleases";
import { useTop100 } from "../../features/home/useTop100";
import { useTopSongs } from "../../features/home/useTopSongs";
import { useTrending } from "../../features/home/useTrending";
import { NewReleaseList } from "./components/NewReleaseList";
import { PlayList } from "./components/PlayList";
import { TopNewSongs } from "./components/TopNewSongs";
import { ZingChart } from "./components/ZingChart";

export const Explore = () => {
  const { data: trendingData, isLoading: trendingLoading } = useTrending();
  const { data: chills, isLoading: chillsLoading } = useChills();
  const { data: top100, isLoading: top100Loading } = useTop100();
  const { data: albumHot, isLoading: albumHotLoading } = useAlbumHot();
  const { data: topSongs, isLoading: topSongLoading } = useTopSongs();
  const { data: chart, isLoading: chartLoading } = useChart();
  const { data: newRelease, isLoading: newReleaseLoading } = useNewRelease();

  if (
    trendingLoading ||
    chillsLoading ||
    albumHotLoading ||
    top100Loading ||
    topSongLoading ||
    newReleaseLoading ||
    chartLoading
  )
    return <Loader />;

  return (
    <section className="pt-[70px]">
      <div>
        <NewReleaseList data={newRelease} />
      </div>
      {trendingData && (
        <div className="mt-[48px]">
          <PlayList data={trendingData} />
        </div>
      )}
      {chills && (
        <div className="mt-[48px]">
          <PlayList data={chills} hasLink />
        </div>
      )}
      {topSongs && (
        <div className="mt-[48px]">
          <TopNewSongs data={topSongs} />
        </div>
      )}
      {chart && (
        <div className="mt-[38px]">
          <ZingChart data={chart} />
        </div>
      )}

      {top100 && (
        <div className="mt-[38px]">
          <PlayList data={top100} hasLink type="artist" />
        </div>
      )}

      {albumHot && (
        <div className="mt-[48px]">
          <PlayList data={albumHot} type="artist" />
        </div>
      )}
    </section>
  );
};
