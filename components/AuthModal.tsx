import React from 'react';
import { X, Mail } from 'lucide-react';

// This component is currently unused after removing authentication requirements.
// Kept as a simple contact modal shell if needed in the future.

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      <div className="relative glass-panel w-full max-w-[400px] rounded-2xl p-8 text-center border border-white/10">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex justify-center mb-4 text-primary">
            <Mail size={40} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Contact Me</h2>
        <p className="text-gray-400 mb-6">Reach out via email to discuss opportunities.</p>
        <a href="mailto:soumyarnpadhi1@gmail.com" className="block w-full py-3 bg-white text-black font-bold rounded-lg">Send Email</a>
      </div>
    </div>
  );
};