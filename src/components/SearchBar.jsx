import { motion as Motion } from "motion/react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative max-w-2xl mx-auto">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, descrição ou categoria..."
          className="w-full bg-zinc-800 text-white rounded-2xl pl-12 pr-12 py-4 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light placeholder:text-gray-400"
        />

        {searchTerm && (
          <Motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <FiX size={20} />
          </Motion.button>
        )}
      </div>
    </Motion.div>
  );
};

export default SearchBar;
