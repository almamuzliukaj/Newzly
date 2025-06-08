import { useEffect } from "react";
import "./ToastNotification.css";

function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      <span className="toast-icon">⚠️</span>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose}>
        ✖
      </button>
    </div>
  );
}

export default ToastNotification;
