interface Props {
  RightIcon?: React.FC<{ className?: string }>;
  LeftIcon?: React.FC<{ className?: string }>;
  title: string;
}

export const PopHoverTag: React.FC<Props> = ({
  title,
  LeftIcon,
  RightIcon,
}) => {
  return (
    <div className="flex cursor-pointer items-center gap-[14px] rounded-[6px] px-[15px] py-[10px] text-[1.4rem] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]">
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
