import Head from "next/head";
import ProductCatalog from "../components/ProductCatalog";
import Toast from "../components/Toast";
import { useCart } from "../contexts/CartContext";

export default function CategoryPage() {
  const { notification, clearNotification } = useCart();
  return (
    <>
      <Head>
        <title>AgroShop - Raízes e Tubérculos - Produtos</title>
      </Head>

      <main id="categoria-page" className="container">
        <nav className="breadcrumb">
          <a href="#" className="breadcrumb-link">
            Início
          </a>
          <span className="breadcrumb-separator">&gt;</span>
          <a href="#" className="breadcrumb-link">
            Produtos
          </a>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Raízes e Tubérculos</span>
        </nav>
        <header
          className="page-header"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="header-content">
            <div className="header-icon">🥕🍠🥔</div>
            <div className="header-text">
              <h1 className="page-title">Raízes e Tubérculos</h1>
            </div>
          </div>
        </header>
        <ProductCatalog />
      </main>

      {/* Toast global para notificações do carrinho */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={clearNotification}
        />
      )}
    </>
  );
}
