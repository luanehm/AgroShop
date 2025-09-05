import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import ProductImage from "./ProductImage";
import ImageModal from "./ImageModal";
import Toast from "./Toast";
import CheckoutModal from "./CheckoutModal";

const CartModal = () => {
  const {
    isModalOpen,
    items,
    totalItems,
    totalPrice,
    notification,
    toggleModal,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearNotification,
  } = useCart();

  const [imageModal, setImageModal] = useState({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
    productName: "",
    producer: "",
  });

  const [checkoutModal, setCheckoutModal] = useState({
    isOpen: false,
  });

  const [animatingItems, setAnimatingItems] = useState(new Set());

  const openImageModal = (item) => {
    setImageModal({
      isOpen: true,
      imageSrc: item.image,
      imageAlt: item.name,
      productName: item.name,
      producer: item.producer,
    });
  };

  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      imageSrc: "",
      imageAlt: "",
      productName: "",
      producer: "",
    });
  };

  const openCheckoutModal = () => {
    setCheckoutModal({ isOpen: true });
  };

  const closeCheckoutModal = () => {
    setCheckoutModal({ isOpen: false });
  };

  const handleRemoveItem = (productId) => {
    // Adicionar animação de remoção
    setAnimatingItems((prev) => new Set([...prev, productId]));

    // Aguardar animação antes de remover
    setTimeout(() => {
      removeFromCart(productId);
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 400);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Adicionar animação de adição se quantidade aumentou
    if (newQuantity > 0) {
      setAnimatingItems((prev) => new Set([...prev, productId]));

      setTimeout(() => {
        setAnimatingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      }, 600);
    }

    updateQuantity(productId, newQuantity);
  };

  // Debug: log dos itens do carrinho
  console.log("CartModal - items:", items);
  console.log("CartModal - totalItems:", totalItems);

  // Suporte a teclado
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      toggleModal();
    }
  };

  // Adicionar listener de teclado quando modal está aberto
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className="cart-modal-overlay"
      onClick={toggleModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h3 id="cart-modal-title">Carrinho de Compras</h3>
          <button
            className="cart-modal-close"
            onClick={toggleModal}
            aria-label="Fechar carrinho"
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="cart-modal-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <p>Seu carrinho está vazio</p>
              <p>Adicione alguns produtos para começar!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`cart-item ${
                      animatingItems.has(item.id) ? "adding" : ""
                    }`}
                  >
                    <div
                      className="cart-item-image"
                      onClick={() => openImageModal(item)}
                      title="Clique para ver a imagem em tamanho grande"
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-producer">{item.producer}</p>
                      <p className="cart-item-price">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="quantity-btn"
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          -
                        </button>
                        <span
                          className="quantity"
                          aria-label={`Quantidade: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="quantity-btn"
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-btn"
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Total de itens:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total:</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-modal-footer">
            <button
              onClick={clearCart}
              className="btn-clear"
              aria-label="Limpar todos os itens do carrinho"
            >
              Limpar Carrinho
            </button>
            <button
              className="btn-checkout"
              onClick={openCheckoutModal}
              aria-label="Finalizar compra e prosseguir para checkout"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Modal de visualização de imagem */}
      <ImageModal
        isOpen={imageModal.isOpen}
        onClose={closeImageModal}
        imageSrc={imageModal.imageSrc}
        imageAlt={imageModal.imageAlt}
        productName={imageModal.productName}
        producer={imageModal.producer}
      />

      {/* Modal de Checkout */}
      <CheckoutModal
        isOpen={checkoutModal.isOpen}
        onClose={closeCheckoutModal}
      />

      {/* Notificação Toast */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={clearNotification}
        />
      )}
    </div>
  );
};

export default CartModal;
