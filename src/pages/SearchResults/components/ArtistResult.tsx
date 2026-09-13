import { Artist } from "../../../api/musicApi";
import { ArtistItem } from "../../../components/ArtistItem";
import { NotFound } from "../../../components/NotFound";

interface Props {
  artists: Artist[] | undefined;
}

export const ArtistResult: React.FC<Props> = ({ artists }) => {
  if (!artists) return <NotFound title="Không có Nghệ sĩ/OA được tìm thấy" />;

  return (
    <>
      <h2 className="mb-[20px] mt-[28px] text-[2rem] font-[700]">Nghệ sĩ/OA</h2>
      <div className="grid grid-cols-5 gap-[28px]">
        {artists.map((item) => (
          <ArtistItem alias={item.alias} key={item.id} />
        ))}
      </div>
    </>
  );
};
