import { themes } from "../constants/data";
import { DialogHeader } from "./Dialog";
import { ThemeGroup } from "./ThemeGroup";

type Props = {
  handleSetPrevTheme: (theme: {
    type: "dark" | "light";
    value: string;
  }) => void;
};

export const ThemePickerDialog: React.FC<Props> = ({ handleSetPrevTheme }) => {
  return (
    <>
      <DialogHeader className="flex px-[30px] py-[20px] text-[2.4rem] font-bold">
        Giao Diện
      </DialogHeader>
      <div className="flex h-[500px] flex-col gap-[20px] overflow-y-scroll pl-[30px]">
        {themes.map((item, index) => (
          <ThemeGroup
            key={index}
            item={item}
            handleSetPrevTheme={handleSetPrevTheme}
          />
        ))}
      </div>
    </>
  );
};
