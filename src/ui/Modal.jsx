import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (x) => setOpenName(x);

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name, maxWidth = "max-w-3xl" }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  return createPortal(
    <AnimatePresence>
      {name === openName && (
        <>
          <motion.div
            className="fixed left-0 top-0 z-[90] h-screen w-full bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
          <div
            className={`${maxWidth} fixed left-1/2 top-1/2 z-[100] w-full -translate-x-1/2 -translate-y-1/2 transform p-2`}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              ref={ref}
              className="relative rounded-lg bg-stone-50 px-4 py-6 shadow-lg sm:p-8"
            >
              <div className="absolute right-5 top-3 z-10">
                <button
                  onClick={close}
                  className="hover:bg-color-grey-100 rounded-sm border-none bg-none p-1"
                >
                  <HiXMark className="text-color-grey-500 h-6 w-6" />
                </button>
              </div>
              <div>
                {cloneElement(children, {
                  onCloseModal: close,
                })}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
