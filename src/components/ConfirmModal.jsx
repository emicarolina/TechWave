import { motion as Motion, AnimatePresence } from "motion/react";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <Motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-zinc-800 border border-zinc-700 w-full max-w-md p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-4">
                <FiAlertTriangle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 font-raleway">
                {title}
              </h2>
              <p className="text-gray-400 mb-8 font-inter">{message}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3.5 rounded-xl transition-colors cursor-pointer font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition-colors cursor-pointer shadow-lg shadow-red-900/20"
              >
                Deletar
              </button>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
