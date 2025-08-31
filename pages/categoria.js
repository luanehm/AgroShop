import Head from "next/head";
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function Categoria() {
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
      <Header />
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

        <header className="page-header">
          <div className="header-content">
            <div className="header-icon">🥕🍠🥔</div>
            <div className="header-text">
              <h1 className="page-title">Raízes e Tubérculos</h1>
              <p className="product-count">
                <span id="product-count">0</span> produtos encontrados
              </p>
            </div>
          </div>
        </header>

        <section className="filters-section">
          <div className="filters-grid">
            {/* Producer Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="producer">
                <div className="filter-icon">👨‍🌾</div>
                <div className="filter-content">
                  <label className="filter-label">Produtor</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Location Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="location">
                <div className="filter-icon">📍</div>
                <div className="filter-content">
                  <label className="filter-label">Localização</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Availability Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="availability">
                <div className="filter-icon">✅</div>
                <div className="filter-content">
                  <label className="filter-label">Disponibilidade</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Format Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="format">
                <div className="filter-icon">📦</div>
                <div className="filter-content">
                  <label className="filter-label">Formato do Lote</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Harvest Date Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="harvest_date">
                <div className="filter-icon">📅</div>
                <div className="filter-content">
                  <label className="filter-label">Data Colheita</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Delivery Filter */}
            <div className="filter-group">
              <div className="filter-dropdown" data-filter="delivery">
                <div className="filter-icon">🚚</div>
                <div className="filter-content">
                  <label className="filter-label">Entrega</label>
                  <div className="dropdown-trigger">
                    <span className="dropdown-value">Todos</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <div className="dropdown-menu">
                    <div className="dropdown-option" data-value="">
                      Todos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sort-section">
          <div className="sort-dropdown" id="sort-dropdown">
            <label className="sort-label">Ordenar por:</label>
            <div className="dropdown-trigger">
              <span className="dropdown-value">Nome A-Z</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-option" data-value="name-asc">
                Nome A-Z
              </div>
              <div className="dropdown-option" data-value="name-desc">
                Nome Z-A
              </div>
              <div className="dropdown-option" data-value="harvest-desc">
                Data Colheita (mais recente)
              </div>
              <div className="dropdown-option" data-value="availability">
                Disponibilidade
              </div>
            </div>
          </div>
        </section>

        <section className="products-section">
          <div id="products-grid" className="products-grid"></div>
        </section>
      </main>
      <Footer />
      {/* Bootstrap JS CDN (optional, for interactive components) */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO"
        crossOrigin="anonymous"
      ></script>
      {/* <script src="/assets/js/categoria.js"></script> */}
    </>
  );
}
