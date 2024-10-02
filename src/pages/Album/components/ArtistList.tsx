import { ArtistItem } from "./ArtistItem";

export const ArtistList = () => {
  return (
    <div className="grid grid-cols-5 gap-[28px]">
      <ArtistItem />
      <ArtistItem />
      <ArtistItem />
      <ArtistItem />
      <ArtistItem />
    </div>
  );
};
