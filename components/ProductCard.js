import { useCart } from "../contexts/CartContext";
import ProductImage from "./ProductImage";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="col">
      <div className="card product-card">
        <div className="card-body text-center">
          {product.discount && (
            <span className="badge bg-success">{product.discount}</span>
          )}
          <div className="product-image">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            {product.producer}
            <br />
            {product.deliveryTime} - {product.distance}
          </p>
          <div className="product-price">
            <span className="price">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-add-cart"
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
