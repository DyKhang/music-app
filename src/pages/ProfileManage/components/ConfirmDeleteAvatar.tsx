import { userApi } from "../../../api/userApi";
import { USER } from "../../../constants/user";
import { update } from "../../../features/auth/authSlice";
import { useAppDispatch } from "../../../store";

type Props = {
  closeModal?: () => void;
};

export const ConfirmDeleteAvatar: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useAppDispatch();

  function handleDeleteAvatar() {
    userApi.deleteAvatar();
    dispatch(update({ avatar: USER.DEFAULT_AVATAR_URL }));
    closeModal!();
  }

  return (
    <div className="max-w-[430px] p-8">
      <h2 className="text-[1.8rem] font-bold">Xóa ảnh đại diện</h2>
      <p className="mt-3 text-[1.4rem]">
        Bạn có chắc chắn muốn xóa ảnh đại diện hiện tại? Ảnh mặc định sẽ được sử
        dụng thay thế.
      </p>
      <div className="mt-5 flex items-center justify-end gap-4">
        <button
          onClick={closeModal}
          className="rounded-md bg-[#d9d7d4] px-4 py-2 text-[1.4rem] font-medium text-[#644646]"
        >
          Hủy bỏ
        </button>
        <button
          onClick={handleDeleteAvatar}
          className="flex h-[32px] w-[108px] cursor-pointer items-center justify-center rounded-md bg-red-700 px-4 py-2 text-[1.4rem] font-medium text-white"
        >
          Xóa ảnh
        </button>
      </div>
    </div>
  );
};
