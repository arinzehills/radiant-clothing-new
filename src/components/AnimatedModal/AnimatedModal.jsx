import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedModal.css";

const AnimatedModal = ({
  openModal,
  setOpenModal,
  children,
  bkdropclassName,
  modalHeight,
}) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };
  return (
    <AnimatePresence>
      {openModal && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
            }}
            className={`animatedmodal_backdrop ${bkdropclassName}  `}
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{ scale: 0 }}
              className={`animatedmodal_content_wrapper 

            `}
              onClick={stopPropagation}
              style={{ height: modalHeight }}
            >
              <motion.div
                initial={{
                  x: 100,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.7,
                  },
                }}
                exit={{ opacity: 0, x: 100 }}
                className="addteam_content"
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
