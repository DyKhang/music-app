import { useState } from "react";
import { cn } from "../utils/cn";

export const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
      className={cn(
        "flex h-[15px] w-[24px] cursor-pointer items-center rounded-full",
        {
          "bg-[#a0a0a0]": !isChecked,
          "bg-purple-primary": isChecked,
        },
      )}
    >
      <div
        className={cn(
          "ml-[3px] size-[8px] rounded-full bg-white transition-all",
          {
            "translate-x-[10px]": isChecked,
          },
        )}
      ></div>
    </div>
  );
};
