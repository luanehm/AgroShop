import { useState } from "react";
import { useCart } from "../contexts/CartContext";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "pix",
    notes: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Dados, 2: Confirmação, 3: Sucesso

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular processamento
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2000);
  };

  const handleConfirmOrder = () => {
    setStep(2);
  };

  const handleBackToCart = () => {
    setStep(1);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "pix",
      notes: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-modal-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-modal-header">
          <h3>
            {step === 1 && "Finalizar Compra"}
            {step === 2 && "Confirmar Pedido"}
            {step === 3 && "Pedido Realizado!"}
          </h3>
          <button className="checkout-modal-close" onClick={handleClose}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="checkout-modal-body">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Endereço de Entrega *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Rua, número, bairro, cidade - CEP"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentMethod">Forma de Pagamento *</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="pix">PIX</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="cash">Dinheiro</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Observações</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Alguma observação especial para seu pedido?"
                  rows="2"
                />
              </div>

              <div className="checkout-summary">
                <h4>Resumo do Pedido</h4>
                <div className="summary-items">
                  {items.map((item) => (
                    <div key={item.id} className="summary-item">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-total">
                  <strong>Total: R$ {totalPrice.toFixed(2)}</strong>
                </div>
              </div>

              <div className="checkout-actions">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="btn-confirm"
                >
                  Continuar
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="checkout-confirmation">
              <div className="confirmation-info">
                <h4>Dados do Pedido</h4>
                <p>
                  <strong>Nome:</strong> {formData.name}
                </p>
                <p>
                  <strong>E-mail:</strong> {formData.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Endereço:</strong> {formData.address}
                </p>
                <p>
                  <strong>Pagamento:</strong>{" "}
                  {formData.paymentMethod === "pix"
                    ? "PIX"
                    : formData.paymentMethod === "credit"
                      ? "Cartão de Crédito"
                      : formData.paymentMethod === "debit"
                        ? "Cartão de Débito"
                        : "Dinheiro"}
                </p>
                {formData.notes && (
                  <p>
                    <strong>Observações:</strong> {formData.notes}
                  </p>
                )}
              </div>

              <div className="confirmation-items">
                <h4>Itens do Pedido</h4>
                {items.map((item) => (
                  <div key={item.id} className="confirmation-item">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="confirmation-total">
                  <strong>Total: R$ {totalPrice.toFixed(2)}</strong>
                </div>
              </div>

              <div className="checkout-actions">
                <button onClick={handleBackToCart} className="btn-back">
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-finalize"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : "Finalizar Pedido"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-success">
              <div className="success-icon">
                <i className="fa fa-check-circle"></i>
              </div>
              <h4>Pedido Realizado com Sucesso!</h4>
              <p>Seu pedido foi enviado e será processado em breve.</p>
              <p>
                Você receberá um e-mail de confirmação em{" "}
                <strong>{formData.email}</strong>
              </p>
              <p>O prazo de entrega é de 2 a 5 dias úteis.</p>

              <div className="success-actions">
                <button onClick={handleClose} className="btn-close">
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

