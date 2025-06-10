// ToastNotification.jsx
import { useEffect } from "react";
import "./ToastNotification.css";

function ToastNotification({ message, onClose }) {
  // Automatically close the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      {/* Warning emoji icon */}
      <span className="toast-icon">⚠️</span>
      {/* Display the notification message */}
      <span>{message}</span>
      {/* Button to manually close the notification */}
      <button className="toast-close" onClick={onClose}>
        ✖
      </button>
    </div>
  );
}

export default ToastNotification;
