import Head from "next/head";

export default function CategoryContent() {
  const { notification, clearNotification } =
    require("../contexts/CartContext").useCart();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AgroShop - Raízes e Tubérculos - Produtos</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />
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
      {/* Bootstrap JS CDN (optional, for interactive components) */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
