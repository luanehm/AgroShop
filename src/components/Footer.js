const Footer = () => (
  <footer id="footer">
    <div className="container first-row">
      <div className="column-image">
        <img
          className="logo"
          src="/assets/images/logo.png"
          alt="AgroShop logo"
          width="236"
          height="236"
        />
      </div>
      <div className="column-nav">
        <div className="footer-nav">
          <h5 className="nav-title bold">Informações Legais</h5>
          <ul className="nav-list">
            <li>
              <a href="#" className="link-nav">
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Política de Entregas e Pagamentos
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Política de Trocas e Devoluções
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-nav">
          <h5 className="nav-title bold">Navegação Rápida</h5>
          <ul className="nav-list">
            <li>
              <a href="/" className="link-nav">
                Página inicial
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Sobre a AgroShop
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Como Funciona
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Catálogo de Produtos
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-nav">
          <h5 className="nav-title bold">Contato</h5>
          <ul className="nav-list">
            <li>
              <a href="/contato.html" className="link-nav">
                Formulário de contato rápido
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                E-mail de suporte
              </a>
            </li>
            <li>
              <a href="#" className="link-nav">
                Telefone / WhatsApp comercial
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container second-row">
      <span className="rights-text">© 2025 AgroShop. All Rights Reserved</span>
    </div>
  </footer>
);

export default Footer;
