import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { cn } from "../../utils/helper";
import { ReactElement } from "react";

type Props = {
  className?: string;
  children?: ReactElement | string;
};

export const Skeleton: React.FC<Props> = ({ className, children }) => {
  const isDark = useSelector((state: RootState) => state.theme.type) === "dark";
  return (
    <div
      className={cn(
        "animate-pulse text-transparent",
        isDark ? "bg-gray-700" : "bg-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
};
