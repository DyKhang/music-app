import React from "react";
import { capitalizeFirstLetter } from "../utils/helper";
import { Theme } from "./Theme";

type Props = {
  item: {
    type: string;
    colors: {
      label: string;
      value: string;
      backgroundImage: string;
    }[];
  };
  handleSetPrevTheme: (theme: {
    type: "dark" | "light";
    value: string;
  }) => void;
};

export const ThemeGroup: React.FC<Props> = ({ item, handleSetPrevTheme }) => {
  return (
    <div>
      <p className="mb-[10px] text-[1.8rem] font-bold">
        {capitalizeFirstLetter(item.type)}
      </p>
      <div className="grid grid-cols-2 gap-[14px] pr-[30px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {item.colors.map((color, index) => (
          <Theme
            key={index}
            item={color}
            type={
              item.type.toLowerCase().includes("màu tối") ? "dark" : "light"
            }
            handleSetPrevTheme={handleSetPrevTheme}
          />
        ))}
      </div>
    </div>
  );
};
