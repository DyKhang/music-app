import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  // useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

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
  const { show, coords } = useContext(PopOverContext)!;
  // const nodeRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   function handleClickOutSidePopOver(e: MouseEvent) {
  //     if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
  //       setShow("");
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutSidePopOver);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutSidePopOver);
  //   };
  // }, [show, name, setShow]);

  if (show !== name) return null;

  return createPortal(
    <div
      style={{
        top: coords.y,
        [position]: coords.x,
      }}
      // ref={nodeRef}
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
