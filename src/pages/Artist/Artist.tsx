import { useParams } from "react-router";
import { useDetailArtist } from "../../features/artist/useDetailArtist";
import { Loader } from "../../components/Loader";

import { Hero } from "./components/Hero";

import { HotSongs } from "./components/HotSongs";
import { NewRelease } from "./components/NewRelease";
import { PlayListArtist } from "./components/PlayListArtist";
import { ReArtists } from "./components/ReArtists";
import { ArtistBiography } from "./components/ArtistBiography";

export const Artist = () => {
  const { alias } = useParams();
  const { data, isLoading } = useDetailArtist(alias!);
  if (isLoading) return <Loader />;

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

  return (
    <section>
      <Hero data={data} />

      {hotSongs && (
        <section
          style={{
            gridTemplateColumns: hasNewRelease ? "393px 1fr 1fr" : "",
          }}
          className={`mt-[30px] ${!hasNewRelease && "grid-cols-2"} hidden gap-[28px] lg:grid`}
        >
          {hasNewRelease && <NewRelease data={data} />}
          <HotSongs data={data} />
        </section>
      )}

      {singlePlaylist && (
        <section className="mt-[48px]">
          <PlayListArtist data={singlePlaylist} hasLink />
        </section>
      )}

      {albumPlaylist && (
        <section className="mt-[48px]">
          <PlayListArtist data={albumPlaylist} hasLink />
        </section>
      )}

      {topPlaylist && (
        <section className="mt-[48px]">
          <PlayListArtist data={topPlaylist} />
        </section>
      )}

      {includesPlaylist && (
        <section className="mt-[48px]">
          <PlayListArtist data={includesPlaylist} />
        </section>
      )}
      {reArtists && (
        <section className="mt-[48px]">
          <ReArtists reArtists={reArtists} />
        </section>
      )}

      {artistDesc && (
        <section className="mt-[48px] flex flex-col items-center sm:block">
          <ArtistBiography data={data} />
        </section>
      )}
    </section>
  );
};
