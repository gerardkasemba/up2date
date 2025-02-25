import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-4 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none">
          <FiX size={24} />
        </button>
        
        {/* Modal Title */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        {/* Modal Content */}
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
