import { createContext, ReactNode, useContext, useState } from "react";

interface value {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopOverContext = createContext<value | undefined>(undefined);

export const PopOver = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  return (
    <PopOverContext.Provider
      value={{
        show,
        setShow,
      }}
    >
      {children}
    </PopOverContext.Provider>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  const value = useContext(PopOverContext);

  return (
    <button onClick={() => value?.setShow(!value?.show)} className="relative">
      {children}
    </button>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  const value = useContext(PopOverContext);

  return (
    value?.show && (
      <div className="bg-white absolute top-[130%] right-0 p-[6px] rounded-[8px] shadow-shadow-popover">
        {children}
      </div>
    )
  );
};

PopOver.Button = Button;
PopOver.Content = Content;
