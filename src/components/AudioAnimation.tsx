import { Audio } from "react-loader-spinner";

export const AudioAnimation = () => {
  return (
    <Audio
      height="26"
      width="26"
      color="#fff"
      ariaLabel="audio-loading"
      wrapperClass="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover/tag:block"
      visible={true}
    />
  );
};
