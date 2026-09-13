import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReactElement } from "react";
import { cn } from "../../utils/cn";

type Props = {
  className?: string;
  children?: ReactElement | string;
};

export const Skeleton: React.FC<Props> = ({ className, children }) => {
  const currentTheme = useSelector((state: RootState) => state.theme);
  const isDark = currentTheme.type === "dark";
  return (
    <div
      className={cn(
        "animate-pulse rounded text-transparent",
        isDark ? "bg-gray-700" : "bg-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
};
