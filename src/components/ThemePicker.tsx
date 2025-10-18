import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Switch } from "./Switch";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";
import { ThemePickerModal } from "./ThemePickerModal";

export const ThemePicker = () => {
  return (
    <div className="absolute right-full top-0 hidden w-[300px] rounded-xl bg-white p-[9px] shadow-md group-hover:block">
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="group/theme cursor-pointer">
            <div className="group-hover/theme:text-purple-primary flex items-center justify-between">
              <p className="text-[1.4rem]">Chủ đề</p>
              <ChevronRightIcon className="size-[20px]" />
            </div>
            <div className="my-2 flex items-center gap-4">
              <div className="h-[60px] w-[100px] rounded-[3px] bg-red-500"></div>
              <p className="font-bold">Xám</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          closeButtonSize={30}
          className="w-full max-w-[900px] gap-0 p-0 pb-[20px] sm:max-w-[900px]"
        >
          <ThemePickerModal />
        </DialogContent>
      </Dialog>
      <div className="mt-4 h-[1px] bg-[rgba(0,0,0,0.05)]"></div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[1.4rem]">Hiệu ứng chuyển động</p>
        <Switch />
      </div>
    </div>
  );
};
