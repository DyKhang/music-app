import { forwardRef } from "react";
import { cn } from "../utils/helper";

type Props = {
  label?: string;
  className?: string;
  type?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, label, type, ...props }, ref) => {
    return (
      <label className="relative">
        <input
          type={type}
          className={cn(
            "border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground } flex h-[44px] w-full rounded-md border-[2px] border-[#79747E] px-3 py-2 text-[1.6rem] outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
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
      </label>
    );
  },
);
Input.displayName = "Input";

export { Input };
