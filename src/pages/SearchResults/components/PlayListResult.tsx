import { PlayList } from "../../../api/searchApi";
import { PlayListItem } from "../../../components/PlayListItem";
import { ResultNotFound } from "../../../components/ResultNotFound";

interface Props {
  playlists: PlayList[] | undefined;
}

export const PlayListResult: React.FC<Props> = ({ playlists }) => {
  if (!playlists)
    return <ResultNotFound title="Không có Playlist/Album được tìm thấy" />;

  return (
    <>
      <h2 className="mb-[20px] mt-[28px] text-[2rem] font-[700]">
        Playlist/Album
      </h2>
      <div className="grid grid-cols-5 gap-[28px]">
        {playlists.map((item) => (
          <PlayListItem
            key={item.encodeId}
            item={{ ...item, releaseDate: parseInt(item.releaseDate) }}
            type="artist"
          />
        ))}
      </div>
    </>
  );
};
