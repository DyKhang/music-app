import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { cn } from "../../utils/helper";
import { ReactElement } from "react";

type Props = {
  className?: string;
  children?: ReactElement | string;
};

export const Skeleton: React.FC<Props> = ({ className, children }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.current);
  const previewTheme = useSelector((state: RootState) => state.theme.preview);
  const isDark = (previewTheme?.type ?? currentTheme.type) === "dark";
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
