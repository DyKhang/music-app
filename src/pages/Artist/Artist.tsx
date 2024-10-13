import { useParams } from "react-router";
import { useDetailArtist } from "../../features/artist/useDetailArtist";
import { Loader } from "../../components/Loader";

import { Hero } from "./components/Hero";

import { HotSongs } from "./components/HotSongs";
import { NewRelease } from "./components/NewRelease";
import { PlayList } from "./components/PlayList";
import { ReArtists } from "./components/ReArtists";
import { ArtistBiography } from "./components/ArtistBiography";

export const Artist = () => {
  const { alias } = useParams();
  const { data, isLoading } = useDetailArtist(alias!);
  const hasNewRelease = Boolean(data?.data.data.topAlbum);
  const singlePlaylist = data?.data.data.sections.find(
    (section) => section.sectionId === "aSingle",
  );

  const albumPlaylist = data?.data.data.sections.find(
    (section) => section.sectionId === "aAlbum",
  );

  const topPlaylist = data?.data.data.sections.find(
    (section) => section.title === "Tuyển tập",
  );

  const includesPlaylist = data?.data.data.sections.find(
    (section) => section.title === "Xuất hiện trong",
  );

  const reArtists = data?.data.data.sections.find(
    (section) => section.sectionId === "aReArtist",
  );

  const hotSongs = data?.data.data.sections.find(
    (section) => section.sectionId === "aSongs",
  );

  const artistDesc = data?.data.data.sortBiography;

  if (isLoading) return <Loader />;

  return (
    <section>
      <Hero data={data} />

      {hotSongs && (
        <section
          style={{
            gridTemplateColumns: hasNewRelease ? "393px 1fr 1fr" : "",
          }}
          className={`mt-[30px] grid ${!hasNewRelease && "grid-cols-2"} gap-[28px]`}
        >
          {hasNewRelease && <NewRelease data={data} />}
          <HotSongs data={data} />
        </section>
      )}

      {singlePlaylist && (
        <section className="mt-[48px]">
          <PlayList data={singlePlaylist} hasLink />
        </section>
      )}

      {albumPlaylist && (
        <section className="mt-[48px]">
          <PlayList data={albumPlaylist} hasLink />
        </section>
      )}

      {topPlaylist && (
        <section className="mt-[48px]">
          <PlayList data={topPlaylist} />
        </section>
      )}

      {includesPlaylist && (
        <section className="mt-[48px]">
          <PlayList data={includesPlaylist} />
        </section>
      )}
      {reArtists && (
        <section className="mt-[48px]">
          <ReArtists reArtists={reArtists} />
        </section>
      )}

      {artistDesc && (
        <section className="mt-[48px]">
          <ArtistBiography data={data} />
        </section>
      )}
    </section>
  );
};