/** @format */
import { AnimatePresence, motion } from "framer-motion";

import React from "react";

const Delete = ({ id, setId, deletData }) => {
  return (
    <AnimatePresence>
      {id && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="fixed z-50 inset-0 flex justify-center items-center bg-base-100/[0.1] backdrop-blur-sm"
        >
          <div className="card max-w-screen-md h-fit shadow-2xl bg-base-100">
            <div className="card-body">
              <label
                onClick={() => setId(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div className="overflow-auto">
                <div className="my-2">
                  <p className="text-center">
                    Apakah anda yakin menghapus data ini?
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    className="btn btn-outline"
                    onClick={() => deletData(true)}
                  >
                    Yakin
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => deletData(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Delete;
