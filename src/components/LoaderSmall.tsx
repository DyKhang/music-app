import { RotatingLines } from "react-loader-spinner";

export const LoaderSmall = () => {
  return (
    <RotatingLines
      visible={true}
      width="20"
      strokeWidth="3"
      strokeColor="#32323d"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
