interface Props {
  RightIcon: React.FC<{ className?: string }>;
  LeftIcon: React.FC<{ className?: string }>;
  title: string;
}

export const HoverTag: React.FC<Partial<Props>> = ({
  LeftIcon,
  RightIcon,
  title,
}) => {
  return (
    <div className="flex items-center text-[#818086] hover:text-[#844d4d] hover:bg-[#eae9e7] rounded-[4px] px-[10px] py-[12px] transition-colors duration-150">
      <div className="size-[20px]">{LeftIcon && <LeftIcon />}</div>
      <span className="text-[1.4rem] ml-5">{title}</span>
      <div className="size-[20px] ml-auto">{RightIcon && <RightIcon />}</div>
    </div>
  );
};
