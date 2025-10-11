import "../assets/fonts/sf-pro/font.css";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import "../assets/css/footer.css";
import "../assets/css/pages/home.css";
import "../assets/css/pages/categoria.css";
import "../assets/css/pages/contato.css";

import { CartProvider } from "../contexts/CartContext";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
