import { createContext, useState, ReactNode, useContext } from "react";

interface Props {
  children: ReactNode;
}

const PopOverContext = createContext({
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
});

export const PopOver: React.FC<Props> & {
  Button: React.FC;
  Content: React.FC;
} = ({ children }) => {
  const [show, setShow] = useState(false);

  const value = { show, setShow };

  return (
    <PopOverContext.Provider value={value}>{children}</PopOverContext.Provider>
  );
};

function Button() {
  const { setShow, show } = useContext(PopOverContext);

  return (
    <button
      onClick={() => {
        setShow(!show);
      }}
    >
      Click me
    </button>
  );
}

function Content() {
  return <p>content</p>;
}

PopOver.Button = Button;
PopOver.Content = Content;
