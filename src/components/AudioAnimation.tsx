import { Audio } from "react-loader-spinner";

interface Props {
  size?: "normal" | "small";
}

export const AudioAnimation: React.FC<Props> = ({ size = "normal" }) => {
  let sizeNumber = "";
  if (size === "normal") {
    sizeNumber = "26";
  } else if (size === "small") {
    sizeNumber = "20";
  }

  return (
    <Audio
      height={sizeNumber}
      width={sizeNumber}
      color="#fff"
      ariaLabel="audio-loading"
      wrapperClass="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block"
      visible={true}
    />
  );
};
