import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Switch } from "./Switch";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";
import { ThemePickerDialog } from "./ThemePickerDialog";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { themes } from "../constants/data";
import { capitalizeFirstLetter } from "../utils/helper";
import { useState } from "react";

export const ThemePicker = () => {
  const [open, setOpen] = useState(false);
  const [prevTheme, setPrevTheme] = useState<null | {
    type: "dark" | "light";
    value: string;
  }>(null);
  const currentTheme = useSelector((state: RootState) => state.theme.value);
  const flatThemes = themes.reduce<
    {
      label: string;
      value: string;
      backgroundImage: string;
    }[]
  >((prev, curr) => [...prev, ...curr.colors], []);
  const targetTheme = flatThemes.find((item) => item.value === currentTheme);
  const handleSetPrevTheme = (theme: {
    type: "dark" | "light";
    value: string;
  }) => {
    setPrevTheme(theme);
  };

  console.log(prevTheme);
  return (
    <div className="absolute right-full top-0 hidden w-[300px] rounded-xl bg-primary-bg p-[9px] shadow-md group-hover:block">
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogTrigger className="w-full">
          <div className="group/theme cursor-pointer">
            <div className="flex items-center justify-between text-text-secondary group-hover/theme:text-text-item-hover">
              <p className="text-[1.4rem]">Chủ đề</p>
              <ChevronRightIcon className="size-[20px]" />
            </div>
            <div className="my-2 flex items-center gap-4">
              <div
                style={{
                  backgroundImage: `url(${targetTheme?.backgroundImage})`,
                }}
                className="h-[60px] w-[100px] rounded-[3px] border border-border-primary"
              ></div>
              <p className="font-bold">
                {capitalizeFirstLetter(targetTheme?.label)}
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          closeButtonSize={30}
          className="w-full max-w-[900px] gap-0 p-0 pb-[20px] sm:max-w-[900px]"
        >
          <ThemePickerDialog handleSetPrevTheme={handleSetPrevTheme} />
        </DialogContent>
      </Dialog>
      <div className="mt-4 h-[1px] bg-border-primary"></div>
      <div className="mt-4 flex items-center justify-between text-text-secondary hover:text-text-item-hover">
        <p className="text-[1.4rem]">Hiệu ứng chuyển động</p>
        <Switch />
      </div>
    </div>
  );
};
