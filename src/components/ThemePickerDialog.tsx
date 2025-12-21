import { themes } from "../constants/data";
import { DialogDescription, DialogHeader, DialogTitle } from "./Dialog";
import { ThemeGroup } from "./ThemeGroup";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemePickerDialog: React.FC<Props> = ({ setOpen }) => {
  return (
    <>
      <DialogDescription className="hidden">Theme Picker</DialogDescription>
      <DialogHeader>
        <DialogTitle className="flex px-[30px] py-[20px] text-[2.4rem] font-bold">
          Giao Diện
        </DialogTitle>
      </DialogHeader>
      <div className="flex h-[500px] flex-col gap-[20px] overflow-y-scroll pl-[30px]">
        {themes.map((item, index) => (
          <ThemeGroup key={index} item={item} setOpen={setOpen} />
        ))}
      </div>
    </>
  );
};
