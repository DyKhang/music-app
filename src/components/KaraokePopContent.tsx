interface Props {
  onBg: boolean;
  setOnBg: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KaraokePopContent: React.FC<Props> = ({ onBg, setOnBg }) => {
  return (
    <div className="w-[270px] rounded-[8px] bg-[#292929] py-[5px]">
      <div className="flex items-center justify-between px-[14px] py-[10px] text-[1.4rem] text-white">
        <span>Hình nền</span>
        <div
          className={`bg-purple-primary relative h-[15px] w-[24px] cursor-pointer rounded-full transition-all duration-150 ${!onBg && "bg-[#a0a0a0]"}`}
          onClick={() => setOnBg(!onBg)}
        >
          <div
            className={`absolute bottom-0 left-0 size-[15px] rounded-full bg-white transition-all duration-150 ${onBg && "translate-x-[9px]"}`}
          ></div>
        </div>
      </div>
    </div>
  );
};
