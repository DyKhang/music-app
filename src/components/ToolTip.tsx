import { ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ToolTipShadCN";

interface Props {
  children: ReactElement;
  title: string;
}

export const ToolTip: React.FC<Props> = ({ children, title }) => {
  return (
    <TooltipProvider delayDuration={20}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
