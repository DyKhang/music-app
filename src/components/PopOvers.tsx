import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

interface value {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
  coords: {
    x: number;
    y: number;
  };
  setCoords: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const PopOverContext = createContext<value | undefined>(undefined);

export const PopOvers = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState("");
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    document.addEventListener("wheel", () => {
      setShow("");
    });
  }, []);

  return (
    <PopOverContext.Provider
      value={{
        show,
        setShow,
        coords,
        setCoords,
      }}
    >
      {children}
    </PopOverContext.Provider>
  );
};

const Button = ({
  children,
  open,
}: {
  children: ReactElement;
  open: string;
}) => {
  const { setShow, setCoords, show } = useContext(PopOverContext)!;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const pos = (e.target as HTMLElement)
        .closest("[pop='popOver']")!
        .getBoundingClientRect();
      setCoords({
        x: window.innerWidth - pos.width - pos.x,
        y: pos.y + pos.height + 8,
      });
      if (show === open) {
        setShow("");
      } else {
        setShow(open);
      }
    },
    pop: "popOver",
  });
};

const Content = ({
  children,
  position = "right",
  name,
}: {
  children: ReactNode;
  position?: "left" | "right";
  name: string;
}) => {
  const { show, coords, setShow } = useContext(PopOverContext)!;
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow("");
  };

  useOnClickOutside(ref, handleClickOutside);

  if (show !== name) return null;

  return createPortal(
    <div
      ref={ref}
      style={{
        top: coords.y,
        [position]: coords.x,
      }}
      className="fixed z-[60] rounded-[8px] bg-white shadow-shadow-popover"
    >
      {children}
    </div>,
    document.body,
  );
};

const PopOver = ({ children }: { children: ReactElement }) => {
  return children;
};

PopOvers.PopOver = PopOver;
PopOvers.Button = Button;
PopOvers.Content = Content;
