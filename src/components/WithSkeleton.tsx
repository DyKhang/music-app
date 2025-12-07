import { ReactElement } from "react";

type Props = {
  isLoading: boolean;
  skeleton: ReactElement;
  children: ReactElement;
};

export const WithSkeleton: React.FC<Props> = ({
  children,
  isLoading,
  skeleton,
}) => {
  if (isLoading) return skeleton;
  return children;
};
