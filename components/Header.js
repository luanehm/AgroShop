const Header = () => (
  <header id="header">
    <div className="first-row">
      <div className="container">
        <img className="logo" src="/assets/images/logo.png" alt="AgroShop logo" width="87" height="87" />
        <div className="holder-search">
          <input type="search" name="busca-header" id="input-search" placeholder="Pesquise aqui por frutas, legumes, produtores..." />
          <i className="icon-search fa fa-search" aria-hidden="true"></i>
        </div>
        <div className="holder-nav">
          <nav className="menu bold">
            <ul className="menu-list">
              <li className="menu-list-item"><a href="/" className="link-nav">Inicio</a></li>
              <li className="menu-list-item"><a href="/categoria" className="link-nav">Categorias</a></li>
              <li className="menu-list-item"><a href="/contato" className="link-nav">Contato</a></li>
            </ul>
            <img className="user-icon" src="/assets/images/icon-produtor.png" alt="ícone do produtor" width="40" height="40" />
          </nav>
        </div>
      </div>
    </div>
    <div className="second-row">
      <div className="container">
        <div className="area-navigation">
          <i className="icon-area fa fa-map-marker" aria-hidden="true"></i>
          <div className="area-text medium">
            <span className="area-text--label">Entregar em</span> <br />
            <span className="area-text--location">Alameda Alaska, 1145</span>
          </div>
        </div>
        <div className="cart bold">
          <a href="#" className="cart-link link-nav">
            <span className="medium">Carrinho</span>
            <i className="cart-icon fa fa-shopping-cart" aria-hidden="true"></i>
          </a>
          <span className="cart-items">5</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
