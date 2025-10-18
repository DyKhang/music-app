import {
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const ModalContext = createContext<{
  openName: string;
  setOpenName: Dispatch<SetStateAction<string>>;
} | null>(null);

export const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState("");

  return (
    <ModalContext.Provider
      value={{
        openName,
        setOpenName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

interface OpenProps {
  open: string;
  children: ReactElement;
}

const Open: React.FC<OpenProps> = ({ children, open }) => {
  const { setOpenName } = useContext(ModalContext)!;

  return cloneElement(children, { onClick: () => setOpenName(open) });
};

interface WindowProps {
  children: ReactElement;
  name: string;
  isTransition?: boolean;
}

const Window: React.FC<WindowProps> = ({
  children,
  name,
  isTransition = true,
}) => {
  const { openName, setOpenName } = useContext(ModalContext)!;

  if (!isTransition) {
    if (openName !== name) return null;

    return createPortal(
      <div
        className={`fixed inset-0 z-[1000] bg-slate-950/40 backdrop-blur-[1px]`}
      >
        <div
          className={`fixed left-1/2 top-1/2 z-[50] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-7 shadow-md transition-all duration-300`}
        >
          <header className="flex justify-end">
            <button
              className="rounded-full bg-transparent"
              onClick={() => setOpenName("")}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-normalBlack text-[2.8rem]"
              />
            </button>
          </header>
          {cloneElement(children, { closeModal: () => setOpenName("") })}
        </div>
      </div>,
      document.body,
    );
  } else {
    return createPortal(
      <div
        className={`${openName === name ? "visible" : "invisible"} fixed inset-0 z-[1000] bg-black/80 backdrop-blur-[1px]`}
      >
        <div
          className={`${openName === name ? "scale-100" : "scale-0"} shadow-md> fixed left-1/2 top-1/2 z-[50] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white transition-all duration-300`}
        >
          {cloneElement(children, { closeModal: () => setOpenName("") })}
        </div>
      </div>,
      document.body,
    );
  }
};

Modal.Open = Open;
Modal.Window = Window;
