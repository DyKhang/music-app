import { useParams } from "react-router";
import { ArtistItem } from "../../../components/ArtistItem";
import { useDetailPlayList } from "../../../features/playlist/useDetailPlaylist";

export const ArtistList = () => {
  const { id } = useParams();
  const { data } = useDetailPlayList(id);

  if (!data) return null;

  const artistAliases: string[] = [];
  data?.song.items.forEach((song) =>
    song.artists.forEach((artist) => {
      if (!artistAliases.includes(artist.alias)) {
        artistAliases.push(artist.alias);
      }
    }),
  );
  const artistAliasesResult = artistAliases.slice(0, 5);

  return (
    <div className="grid grid-cols-5 gap-[28px]">
      {artistAliasesResult.map((alias) => (
        <ArtistItem key={alias} alias={alias} />
      ))}
    </div>
  );
};
