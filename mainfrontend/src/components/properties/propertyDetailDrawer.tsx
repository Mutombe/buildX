import { X } from "lucide-react";

const SlideOutPanel = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <button
          onClick={onClose}
          className="float-right text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default SlideOutPanel;
