import { createContext, ReactNode, useContext, useState } from "react";

interface value {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopOverContext = createContext<value | undefined>(undefined);

export const PopOver = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  const value = { setShow, show };
  return (
    <PopOverContext.Provider value={value}>{children}</PopOverContext.Provider>
  );
};

const Button = () => {
  const { show, setShow } = useContext(PopOverContext);

  return <button onClick={() => setShow(!show)}>Click me!</button>;
};

const Content = () => {
  return <p>hihihi</p>;
};

PopOver.Button = Button;
PopOver.Content = Content;
