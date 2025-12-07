import { NewReleaseListSkeleton } from "../../components/skeletons/NewReleaseListSkeleton";
import { PlayListSkeleton } from "../../components/skeletons/PlayListSkeleton";
import { WithSkeleton } from "../../components/WithSkeleton";
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
  const { data: topSongs } = useTopSongs();
  const { data: chart } = useChart();
  const { data: newRelease, isLoading: newReleaseLoading } = useNewRelease();

  return (
    <section className="space-y-[48px] pt-[70px]">
      <WithSkeleton
        isLoading={newReleaseLoading}
        skeleton={<NewReleaseListSkeleton />}
      >
        <NewReleaseList data={newRelease} />
      </WithSkeleton>

      <WithSkeleton isLoading={trendingLoading} skeleton={<PlayListSkeleton />}>
        <PlayList data={trendingData} />
      </WithSkeleton>

      <WithSkeleton isLoading={chillsLoading} skeleton={<PlayListSkeleton />}>
        <PlayList data={chills} />
      </WithSkeleton>

      <WithSkeleton isLoading={top100Loading} skeleton={<PlayListSkeleton />}>
        <PlayList data={top100} />
      </WithSkeleton>

      <WithSkeleton isLoading={albumHotLoading} skeleton={<PlayListSkeleton />}>
        <PlayList data={albumHot} />
      </WithSkeleton>

      {topSongs && <TopNewSongs data={topSongs} />}

      <div className="space-y-[38px]">
        {chart && <ZingChart data={chart} />}
        {top100 && <PlayList data={top100} type="artist" />}
      </div>

      {albumHot && <PlayList data={albumHot} type="artist" />}
    </section>
  );
};
