import { Bars } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Bars
      height="60"
      width="60"
      color="var(--purple-primary)"
      ariaLabel="bars-loading"
      wrapperClass="flex justify-center items-center h-full"
      visible={true}
    />
  );
};
