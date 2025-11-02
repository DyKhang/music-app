interface Props {
  setStatus: React.Dispatch<React.SetStateAction<"all" | "vPop" | "others">>;
  children: string;
  status: "all" | "vPop" | "others";
  currentStatus: "all" | "vPop" | "others";
}

export const Tag: React.FC<Props> = ({
  setStatus,
  children,
  status,
  currentStatus,
}) => {
  return (
    <div
      onClick={() => setStatus(status)}
      className={`flex cursor-pointer items-center justify-center rounded-full border-[1px] border-border-primary px-[24px] py-[4px] text-[1rem] uppercase sm:text-[1.2rem] ${status === currentStatus ? "border-purple-primary bg-purple-primary text-white" : "border-[rgba(0,0,0,0.1)]"}`}
    >
      {children}
    </div>
  );
};
