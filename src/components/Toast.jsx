import { motion as Motion, AnimatePresence } from "motion/react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const Toast = ({ isVisible, message, type = "success" }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`fixed bottom-6 right-6 z-100 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 ${
            type === "success" ? "bg-blue" : "bg-red-600"
          } text-white`}
        >
          {type === "success" ? (
            <FiCheckCircle size={24} />
          ) : (
            <FiAlertCircle size={24} />
          )}
          <p className="font-inter font-medium">{message}</p>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
