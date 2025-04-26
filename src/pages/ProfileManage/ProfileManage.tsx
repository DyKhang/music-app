import { useLocation } from "react-router-dom";

export const ProfileManage = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div className="w-[60%] space-y-8 rounded-lg bg-[#f5f3f0] p-10">
      <div className="space-y-3">
        <label className="text-[1.4rem] font-medium">Ảnh đại diện</label>
        <div className="flex items-center gap-8">
          <img
            src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww"
            alt="avatar"
            className="size-[60px] rounded-full object-cover"
          />

          <button className="rounded-md bg-[#644646] px-4 py-2 text-[1.4rem] font-medium text-white">
            Thay đổi ảnh
          </button>

          <button className="rounded-md bg-[#d9d7d4] px-4 py-2 text-[1.4rem] font-medium text-[#644646]">
            Xóa ảnh
          </button>
        </div>
      </div>

      <label className="flex flex-col space-y-3">
        <div className="text-[1.4rem] font-medium">Tên người dùng</div>
        <input
          type="text"
          value="Dỹ Khang"
          className="border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground } flex h-[44px] w-full rounded-md border-[2px] border-[#79747E] px-3 py-2 text-[1.6rem] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>

      <label className="flex flex-col space-y-3">
        <div className="text-[1.4rem] font-medium">Email</div>
        <input
          type="text"
          value="dk@123.com"
          disabled
          className="border-input ring-offset-background file:text-foreground placeholder:text-muted-foreground } flex h-[44px] w-full rounded-md border-[2px] border-[#79747E] px-3 py-2 text-[1.6rem] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-80"
        />
      </label>

      <div className="flex justify-end">
        <button className="rounded-md bg-[#644646] px-6 py-3 text-[1.4rem] font-medium text-white">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};
