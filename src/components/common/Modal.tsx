import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 backdrop-blur-sm transition-opacity"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        onClick={onClose}
      />

      
      <div className="relative flex min-h-full items-center justify-center p-4 z-10">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-20">
      
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Contenido del modal */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

