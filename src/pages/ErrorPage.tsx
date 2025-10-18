import { FallbackProps } from "react-error-boundary";

export const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex h-screen flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-[2.8rem] font-[700]">Có lỗi xảy ra 🤒</h1>
        <p className="mt-[10px] text-[1.8rem]">{error.message}</p>
        <button
          className="bg-purple-primary mt-6 rounded-full px-[28px] py-[8px] text-[1.8rem] text-white"
          onClick={resetErrorBoundary}
        >
          Quay trở lại
        </button>
      </div>
    </div>
  );
};
