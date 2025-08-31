import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router";

export const UpdateAccount = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const navigate = useNavigate();

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center rounded-[8px] bg-[#644646] p-3 hover:text-[#32323d]">
        <span className="mt-4 text-center text-[1.2rem] font-semibold text-white">
          Đăng nhập để khám phá playlist dành riêng cho bạn
        </span>
        <button
          onClick={() => navigate("/sign-in")}
          className="my-4 w-[146px] rounded-full border border-white px-[16px] py-[6px] text-[1.2rem] font-semibold text-white"
        >
          ĐĂNG NHẬP
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center rounded-[8px] bg-custom-gradient p-3 hover:text-[#32323d]">
      <span className="mt-4 text-center text-[1.2rem] font-semibold text-white">
        Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
      </span>
      <button className="my-4 rounded-full bg-[#fadb00] px-[16px] py-[6px] text-[1.2rem] font-semibold">
        NÂNG CẤP TÀI KHOẢN
      </button>
    </div>
  );
};
