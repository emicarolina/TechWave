import { motion as Motion, AnimatePresence } from "motion/react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-zinc-800 border border-zinc-700 w-full max-w-md p-6 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                <FiAlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Excluir Produto</h2>
            </div>

            <p className="text-gray-400 mb-6">
              Tem certeza que deseja deletar o produto{" "}
              <span className="text-white font-semibold">"{productName}"</span>?
              Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors cursor-pointer"
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

export default DeleteConfirmModal;
