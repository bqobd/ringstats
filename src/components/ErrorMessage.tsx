import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ett fel uppstod</h2>
        <p className="text-red-600 mb-6">{message}</p>
        <button 
          onClick={onRetry}
          className="w-full btn btn-primary"
        >
          Försök igen
        </button>
      </div>
    </div>
  );
}