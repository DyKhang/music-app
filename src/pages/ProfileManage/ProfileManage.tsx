import { UpdateAvatar } from "./components/UpdateAvatar";
import { UpdateProfileForm } from "./components/UpdateProfileForm";

export const ProfileManage = () => {
  return (
    <div className="w-[60%] space-y-8 rounded-lg bg-alpha-bg p-10">
      <UpdateAvatar />
      <UpdateProfileForm />
    </div>
  );
};
