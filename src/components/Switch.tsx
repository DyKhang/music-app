import clsx from "clsx";
import { useState } from "react";

export const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      onClick={() => setIsChecked(!isChecked)}
      className={clsx(
        "bg-purple-primary flex h-[15px] w-[24px] cursor-pointer items-center rounded-full",
        {
          "bg-[#a0a0a0]": !isChecked,
        },
      )}
    >
      <div
        className={clsx(
          "ml-[3px] size-[8px] rounded-full bg-white transition-all",
          {
            "translate-x-[10px]": isChecked,
          },
        )}
      ></div>
    </div>
  );
};
