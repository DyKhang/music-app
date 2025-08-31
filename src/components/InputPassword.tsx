import { forwardRef, useState } from "react";
import { cn } from "../utils/helper";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {
  label?: string;
  className?: string;
};

const InputPassword = forwardRef<HTMLInputElement, Props>(
  ({ className, label, ...props }, ref) => {
    const [hiddenPassword, setHiddenPassword] = useState(true);

    return (
      <label className="relative">
        <input
          type={hiddenPassword ? "password" : "text"}
          className={cn(
            "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground } flex h-[44px] w-full rounded-md border-[2px] border-[#79747E] px-3 py-2 pr-[34px] text-[1.6rem] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <span className="absolute left-[12px] top-[-10px] select-none bg-white text-[1.4rem]">
            {label}
          </span>
        )}
        {!hiddenPassword ? (
          <EyeIcon
            onClick={() => setHiddenPassword(true)}
            className="absolute right-4 top-1/2 size-[24px] -translate-y-1/2 cursor-pointer"
          />
        ) : (
          <EyeSlashIcon
            onClick={() => setHiddenPassword(false)}
            className="absolute right-4 top-1/2 size-[24px] -translate-y-1/2 cursor-pointer"
          />
        )}
      </label>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
