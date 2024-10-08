import { Section } from "../../../api/artistApi";
import { ArtistItem } from "../../../components/ArtistItem";

interface Props {
  reArtists: Section | undefined;
}

export const ReArtists: React.FC<Props> = ({ reArtists }) => {
  return (
    <>
      <h2 className="mb-[20px] text-[2rem] font-[700]">Bạn Có Thể Thích</h2>
      <div className="grid grid-cols-5 gap-[28px]">
        {reArtists?.items.map(
          (item, index) =>
            index < 5 && <ArtistItem alias={item.alias} key={item.encodeId} />,
        )}
      </div>
    </>
  );
};
