import { RotatingLines } from "react-loader-spinner";

interface Props {
  color?: string;
}

export const LoaderSmall: React.FC<Props> = ({
  color = "var(--text-primary)",
}) => {
  return (
    <RotatingLines
      visible={true}
      width="20"
      strokeWidth="3"
      strokeColor={color}
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
