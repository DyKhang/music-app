import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { useState } from "react";
import { userApi } from "../../../api/userApi";
import { update } from "../../../features/auth/authSlice";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Modal } from "../../../components/Modal";
import { ConfirmDeleteAvatar } from "./ConfirmDeleteAvatar";
import { USER } from "../../../constants/user";

export const UpdateAvatar = () => {
  const session = useSelector((state: RootState) => state.auth.session);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();

  async function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];

    if (!image) return;

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      setIsPending(true);
      const {
        data: { avatar },
      } = await userApi.uploadAvatar(formData);

      dispatch(update({ avatar }));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-[1.4rem] font-medium">Ảnh đại diện</label>
      <div className="flex items-center gap-8">
        <img
          src={session!.avatar}
          alt="avatar"
          className="size-[60px] rounded-full object-cover"
        />

        <label
          className={clsx(
            "bg-purple-primary flex h-[32px] w-[108px] cursor-pointer items-center justify-center rounded-md px-4 py-2 text-[1.4rem] font-medium text-white",
            {
              "pointer-events-none opacity-80": isPending,
            },
          )}
        >
          {isPending ? (
            <ArrowPathIcon className="size-[20px] animate-spin" />
          ) : (
            "Thay đổi ảnh"
          )}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            hidden
            onChange={handleChangeAvatar}
          />
        </label>

        {!isPending && session?.avatar !== USER.DEFAULT_AVATAR_URL && (
          <>
            <Modal.Open open="delete-avatar">
              <button className="text-purple-primary rounded-md bg-[#d9d7d4] px-4 py-2 text-[1.4rem] font-medium">
                Xóa ảnh
              </button>
            </Modal.Open>
            <Modal.Window name="delete-avatar">
              <ConfirmDeleteAvatar />
            </Modal.Window>
          </>
        )}
      </div>
    </div>
  );
};
