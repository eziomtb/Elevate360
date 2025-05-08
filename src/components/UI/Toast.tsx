import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface ToastProps {
  toast: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    title?: string;
  };
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);
  
  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-500',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-500',
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          title: 'text-red-800',
          message: 'text-red-700'
        };
      case 'warning':
        return {
          container: 'bg-amber-50 border-amber-500',
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          title: 'text-amber-800',
          message: 'text-amber-700'
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-500',
          icon: <Info className="h-5 w-5 text-blue-500" />,
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
    }
  };
  
  const styles = getToastStyles();
  
  return (
    <div 
      className={`max-w-md w-full border-l-4 rounded-md shadow-md ${styles.container}`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {toast.title && (
              <p className={`text-sm font-medium ${styles.title}`}>{toast.title}</p>
            )}
            <p className={`text-sm ${styles.message} mt-1`}>{toast.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;