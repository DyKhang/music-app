import { getSongReducer } from "../../../features/player/playerSlice";
import { useAppDispatch } from "../../../store";

interface Props {
  RightIcon?: React.FC<{ className?: string }>;
  LeftIcon?: React.FC<{ className?: string }>;
  title: string;
  encodeId?: string;
}

export const PopHoverTag: React.FC<Props> = ({
  title,
  LeftIcon,
  RightIcon,
  encodeId,
}) => {
  const dispatch = useAppDispatch();
  function handleClick() {
    if (encodeId) {
      dispatch(getSongReducer({ id: encodeId, type: "next" }));
    } else {
      return null;
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-[14px] rounded-[6px] px-[15px] py-[10px] text-[1.4rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]"
    >
      {LeftIcon && (
        <div className="size-[16px]">
          <LeftIcon />
        </div>
      )}
      <span>{title}</span>
      {RightIcon && (
        <div className="ml-auto size-[16px]">
          <RightIcon />
        </div>
      )}
    </div>
  );
};
