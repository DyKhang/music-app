import React from "react";
import { capitalizeFirstLetter } from "../utils/helper";
import { RootState, useAppDispatch } from "../store";
import { setTheme } from "../features/theme/themeSlice";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { Check } from "lucide-react";

type Props = {
  item: {
    label: string;
    value: string;
    backgroundImage: string;
  };
  type: "dark" | "light";
};

export const Theme: React.FC<Props> = ({ item, type }) => {
  const currentTheme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useAppDispatch();
  const handleChangeTheme = () => {
    dispatch(setTheme({ type, value: item.value }));
  };
  const isActive = currentTheme === item.value;

  return (
    <div>
      <div
        className={clsx("group relative overflow-hidden rounded-[5px] border", {
          "border-purple-primary": isActive,
        })}
      >
        {isActive && (
          <div className="absolute bottom-[8px] right-[8px] flex size-[20px] items-center justify-center rounded-full bg-purple-primary">
            <Check size={12} className="translate-x-[0.5px] text-white" />
          </div>
        )}
        <div
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
          }}
          className="h-[100px] rounded-[5px]"
        ></div>
        <div className="absolute inset-0 hidden flex-col items-center justify-center gap-[10px] bg-[#00000080] text-[0.8rem] uppercase text-white group-hover:flex">
          <div
            onClick={handleChangeTheme}
            className="w-[100px] cursor-pointer rounded-full bg-purple-primary py-[5px] text-center hover:brightness-90"
          >
            Áp dụng
          </div>
          <div className="w-[100px] cursor-pointer rounded-full border border-white py-[5px] text-center hover:brightness-90">
            Xem trước
          </div>
        </div>
      </div>
      <p className="mt-[6px] text-[1.2rem] font-medium">
        {capitalizeFirstLetter(item.label)}
      </p>
    </div>
  );
};
