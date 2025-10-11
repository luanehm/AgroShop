const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  productName,
  producer,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-modal-overlay" onClick={handleOverlayClick}>
      <div className="image-modal">
        <button className="image-modal-close" onClick={onClose}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>

        <div className="image-modal-content">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || "Imagem do produto"}
              onError={(e) => {
                console.log("Image error in modal:", e.target.src);
                e.target.style.display = "none";
                // Mostrar fallback quando a imagem falha
                const fallback = e.target.nextElementSibling;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
          ) : null}

          {!imageSrc && (
            <div
              className="image-modal-fallback"
              style={{ display: imageSrc ? "none" : "flex" }}
            >
              <div className="fallback-icon">📦</div>
              <div className="fallback-text">Imagem não disponível</div>
            </div>
          )}

          {(productName || producer) && (
            <div className="image-modal-info">
              {productName && <h3>{productName}</h3>}
              {producer && <p>Produtor: {producer}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
