import "../assets/fonts/sf-pro/font.css";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import "../assets/css/footer.css";
import "../assets/css/pages/home.css";
import "../assets/css/pages/categoria.css";
import "../assets/css/pages/contato.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import Script from "next/script";

import { CartProvider } from "../contexts/CartContext";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Carrega o script após a página se tornar interativa
        />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
