import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  image: string;
  name: string;
  desc: string;
  closeModal?: () => void;
}

export const ArtistBiographyModal: React.FC<Props> = ({
  name,
  closeModal,
  image,
  desc,
}) => {
  return (
    <div className="relative flex h-[448px] w-[360px] flex-col bg-[#f7f5f3] sm:w-[480px]">
      <div className="relative flex-shrink-0 overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "50%",
            backgroundPositionY: "10%",
          }}
          className="absolute inset-0 bg-cover bg-no-repeat blur-[50px]"
        ></div>
        <div className="absolute inset-0 bg-[#f7f5f3] opacity-[40%]"></div>
        <div
          style={{
            backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,0),#f7f5f3",
          }}
          className="relative flex flex-col items-center p-[24px] pb-[0]"
        >
          <img
            src={image}
            alt=""
            className="w-[110px] rounded-full object-cover"
          />
          <h2 className="mt-[12px] text-[2.4rem] font-[700]">{name}</h2>
        </div>
      </div>
      <div className="flex-1 p-[24px]">
        <div className="h-[218px] overflow-y-scroll">
          {desc.split("<br>").map((p) => (
            <p key={p} className="text-text-secondary text-[1.4rem]">
              {p} <br />
            </p>
          ))}
        </div>
      </div>
      <XMarkIcon
        className="absolute right-4 top-4 size-[22px] cursor-pointer"
        onClick={closeModal}
      />
    </div>
  );
};
