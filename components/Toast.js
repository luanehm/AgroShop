import { useState, useEffect } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar toast após um pequeno delay para animação
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Esconder toast após a duração especificada
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // Aguardar animação de saída
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 10000,
      padding: "16px 20px",
      borderRadius: "12px",
      color: "white",
      fontWeight: "600",
      fontSize: "0.95rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transform: isVisible ? "translateX(0)" : "translateX(100%)",
      opacity: isVisible ? 1 : 0,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "300px",
      maxWidth: "400px",
    };

    switch (type) {
      case "success":
        return {
          ...baseStyles,
          background: "linear-gradient(135deg, #28a745, #20c997)",
        };
      case "error":
        return {
          ...baseStyles,
          background: "linear-gradient(135deg, #dc3545, #c82333)",
        };
      case "warning":
        return {
          ...baseStyles,
          background: "linear-gradient(135deg, #ffc107, #e0a800)",
          color: "#212529",
        };
      case "info":
        return {
          ...baseStyles,
          background: "linear-gradient(135deg, #17a2b8, #138496)",
        };
      default:
        return baseStyles;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "✓";
    }
  };

  return (
    <div style={getToastStyles()}>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          minWidth: "20px",
          textAlign: "center",
        }}
      >
        {getIcon()}
      </div>
      <div style={{ flex: 1 }}>{message}</div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(), 300);
        }}
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "none",
          color: "inherit",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: "bold",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

