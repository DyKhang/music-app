import { PlayListType } from "../../../api/homeApi";
import { PlayListItem } from "../../../components/PlayListItem";
import { upperCaseFirstLetter } from "../../../utils/helper";

interface Props {
  data: PlayListType | undefined;
  isAlbum?: boolean;
}

export const PlayList: React.FC<Props> = ({ data, isAlbum }) => {
  // const isAlbum = data?.title.toLocaleLowerCase().includes("album");
  return (
    <section>
      <h2 className="text-[2rem] font-bold">
        {upperCaseFirstLetter(data?.title)}
      </h2>
      <div className="mt-[20px] grid grid-cols-5 gap-[28px]">
        {data?.items.map(
          (item, index) =>
            index <= 4 && (
              <PlayListItem item={item} isAlbum={isAlbum} key={item.encodeId} />
            ),
        )}
      </div>
    </section>
  );
};
