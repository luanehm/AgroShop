import Toast from "./Toast";

const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 10000 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

