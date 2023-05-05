/** @format */

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { ShowModalContext } from "../../context/ShowModalContext";

const Modal = ({ children }) => {
  const { showModal, setShowModal } = useContext(ShowModalContext);
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed z-50 inset-0 flex justify-center items-center bg-base-100/[0.1] backdrop-blur-sm"
        >
          <div className="card w-[90vh] shadow-2xl bg-base-100">
            <div className="card-body">
              <label
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="overflow-auto">{children}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
