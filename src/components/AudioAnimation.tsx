import { Audio } from "react-loader-spinner";

interface Props {
  size?: "normal" | "small";
}

export const AudioAnimation: React.FC<Props> = ({ size = "normal" }) => {
  const mappedSize = {
    normal: "26",
    small: "20",
  };

  return (
    <Audio
      height={mappedSize[size]}
      width={mappedSize[size]}
      color="#fff"
      ariaLabel="audio-loading"
      wrapperClass="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block"
      visible={true}
    />
  );
};
