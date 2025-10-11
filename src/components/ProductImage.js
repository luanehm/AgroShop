const ProductImage = ({ src, alt, className = "" }) => {
  // Versão simplificada - apenas retorna a imagem
  if (!src) {
    return (
      <div className={`product-image-fallback ${className}`}>
        <div className="fallback-icon">📦</div>
        <div className="fallback-text">Produto</div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`product-image ${className}`}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
        borderRadius: "12px",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      onError={(e) => {
        console.log("Image error:", e.target.src);
        e.target.style.display = "none";
      }}
      onLoad={() => {
        console.log("Image loaded:", src);
      }}
    />
  );
};

export default ProductImage;
