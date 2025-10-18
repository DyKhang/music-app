interface Props {
  RightIcon: React.FC<{ className?: string }>;
  LeftIcon: React.FC<{ className?: string }>;
  title: string;
  onClick?: () => void;
}

export const HoverTag: React.FC<Partial<Props>> = ({
  LeftIcon,
  RightIcon,
  title,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="hover:text-text-item-hover group-hover:text-text-item-hover flex cursor-pointer items-center rounded-[4px] px-[10px] py-[12px] text-[#818086] transition-colors duration-75 hover:bg-[#eae9e7] group-hover:bg-[#eae9e7]"
    >
      <div className="size-[20px]">{LeftIcon && <LeftIcon />}</div>
      <span className="ml-5 text-[1.4rem]">{title}</span>
      <div className="ml-auto size-[20px]">{RightIcon && <RightIcon />}</div>
    </div>
  );
};
