import React from "react";
import { capitalizeFirstLetter } from "../utils/helper";
import { useAppDispatch } from "../store";
import { setTheme } from "../features/theme/themeSlice";

type Props = {
  item: {
    label: string;
    value: string;
    backgroundImage: string;
  };
};

export const Theme: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const handleChangeTheme = () => {
    dispatch(setTheme(item.value));
  };

  return (
    <div>
      <div className="group relative overflow-hidden rounded-[5px]">
        <div
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
          }}
          className="h-[100px]"
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
