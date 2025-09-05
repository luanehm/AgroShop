import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartModal from "../components/CartModal";
import ProductCard from "../components/ProductCard";
import { CartProvider } from "../contexts/CartContext";

// Dados de exemplo dos produtos
const sampleProducts = [
  {
    id: 1,
    name: "Tomates",
    producer: "Fazenda Colorado",
    price: 8.5,
    originalPrice: 10.0,
    image: "/assets/images/batata_inglesa.png",
    deliveryTime: "18h",
    distance: "70km",
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Batata Doce",
    producer: "Fazenda Verde",
    price: 6.0,
    image: "/assets/images/batata_doce.png",
    deliveryTime: "24h",
    distance: "50km",
  },
  {
    id: 3,
    name: "Mandioca",
    producer: "Sítio São José",
    price: 4.5,
    image: "/assets/images/mandioca.png",
    deliveryTime: "12h",
    distance: "30km",
  },
  {
    id: 4,
    name: "Batata Inglesa",
    producer: "Fazenda Colorado",
    price: 7.0,
    originalPrice: 8.5,
    image: "/assets/images/batata_inglesa.png",
    deliveryTime: "18h",
    distance: "70km",
    discount: "18% OFF",
  },
  {
    id: 5,
    name: "Cenoura",
    producer: "Horta Orgânica",
    price: 5.5,
    image: "/assets/images/batata_doce.png",
    deliveryTime: "6h",
    distance: "20km",
  },
  {
    id: 6,
    name: "Cebola",
    producer: "Fazenda Grande",
    price: 3.5,
    image: "/assets/images/mandioca.png",
    deliveryTime: "36h",
    distance: "90km",
  },
];

function HomeContent() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AgroShop</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      <main id="home-page">
        <section className="bg-light">
          <div className="d-flex flex-wrap align-items-center w-100">
            <div className="position-relative w-100">
              <img
                id="banner-image"
                src="/assets/images/banner.png"
                alt="agricultores"
                className="img-fluid banner-img"
              />
            </div>
          </div>
        </section>
        <section className="container py-4">
          <h4 className="mb-4">Categorias</h4>
          <div className="row">
            {/* Folhosas */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img src="/assets/images/Folhosas.png" alt="Folhosas" />
                <div className="card-body">
                  <h2>Folhosas</h2>
                </div>
              </div>
            </div>
            {/* Frutas */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img src="/assets/images/Frutas.png" alt="Frutas" />
                <div className="card-body">
                  <h2>Frutas</h2>
                </div>
              </div>
            </div>
            {/* Raizes e Tuberculos  */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img
                  src="/assets/images/raizes_e_tuberculos.png"
                  alt="Raizes e Tuberculos"
                />
                <div className="card-body">
                  <h2>
                    Raizes e <br />
                    Tuberculos
                  </h2>
                </div>
              </div>
            </div>
            {/* Grãos e Cereais */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img src="/assets/images/graos.png" alt="Grãos e Cereais" />
                <div className="card-body">
                  <h2>
                    Grãos e <br />
                    Cereais
                  </h2>
                </div>
              </div>
            </div>
            {/* Legumes e Hortaliças */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img src="/assets/images/Folhosas.png" alt="Folhas" />
                <div className="card-body">
                  <h2>
                    Legumes e <br />
                    Hortaliças
                  </h2>
                </div>
              </div>
            </div>
            {/* Laticinios Artesanais */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img
                  src="/assets/images/laticinios.png"
                  alt="Laticinios Artesanais"
                />
                <div className="card-body">
                  <h2>
                    Laticínios
                    <br />
                    Artesanais
                  </h2>
                </div>
              </div>
            </div>
            {/* Ovos e Criações */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img
                  src="/assets/images/laticinios.png"
                  alt="Ovos e Criações"
                />
                <div className="card-body">
                  <h2>
                    Ovos e <br />
                    Criações
                  </h2>
                </div>
              </div>
            </div>
            {/* Ovos e Criações (duplicated) */}
            <div className="card-wrapper">
              <div className="card-personalizado">
                <img
                  src="/assets/images/laticinios.png"
                  alt="Ovos e Criações"
                />
                <div className="card-body">
                  <h2>
                    Ovos e <br />
                    Criações
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-4">
          <h4 className="mb-4">Mais vendidos</h4>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
            {sampleProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section className="container py-4">
          <h4 className="mb-4">Preços especiais</h4>
          <div className="d-flex gap-3 flex-wrap">
            <div className="discount">10% OFF</div>
            <div className="discount">20% OFF</div>
            <div className="discount">30% OFF</div>
            <div className="discount">40% OFF</div>
            <div className="discount">50% OFF</div>
          </div>
        </section>
        <section className="bg-light py-4">
          <div className="container">
            <h5 className="mb-4">Mais Próximos</h5>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-secondary">
                Fazenda Colorado - 1d - 80km
              </span>
              <span className="badge bg-secondary">
                Sekita Agronegócios - 1d - 80km
              </span>
              <span className="badge bg-secondary">Produtor - 1d - 80km</span>
            </div>
            <h5 className="mt-3 mb-4">Famosos na Região</h5>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-secondary">Produtor - 1d - 80km</span>
              <span className="badge bg-secondary">Produtor - 1d - 80km</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartModal />
      {/* Bootstrap JS CDN (optional, for interactive components) */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
