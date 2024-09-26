import { Bars } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Bars
      height="60"
      width="60"
      color="#614646"
      ariaLabel="bars-loading"
      wrapperClass="flex justify-center items-center h-full"
      visible={true}
    />
  );
};
