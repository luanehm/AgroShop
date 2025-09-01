import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contato() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AgroShop - Fale conosco</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      <main id="contact-page">
        <div className="container">
          <div className="w-full mb-8 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">
              Pronto para revolucionar o seu negócio?
            </h1>
            <p className="text-gray-600 mt-2">
              Entre em contato e seja um parceiro Agroshop!
            </p>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <svg
                className="icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.4,64,128,122.9,52.6,64ZM216,192H40V74.1l82.6,66.1a8,8,0,0,0,10.8,0L216,74.1Z" />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">E-mail</h2>
                <p className="text-gray-700">comercial@agroshop.com</p>
                <p className="text-gray-500 text-sm">
                  Para empresas, compras em escala ou parcerias.
                </p>
              </div>
            </div>
            <div className="info-item">
              <svg
                className="icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M224,176v40a16,16,0,0,1-16,16H184c-31.2,0-60.8-12.8-82.6-34.6S64,131.2,64,100V64a16,16,0,0,1,16-16H120a16,16,0,0,1,16,16v40a8,8,0,0,1-2.4,5.6l-21.8,21.9A94.9,94.9,0,0,0,128,179.8l21.9-21.8A8,8,0,0,1,154.4,152h40A16,16,0,0,1,216,168Z" />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Telefone
                </h2>
                <p className="text-gray-700">(16) 98000-0000</p>
                <p className="text-gray-500 text-sm">
                  Atendimento: Segunda a sexta, as 9h às 18h
                </p>
              </div>
            </div>
            <div className="info-item">
              <svg
                className="icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A96,96,0,0,0,32,120a95.3,95.3,0,0,0,23.3,61.8L128,232l72.7-50.2A95.3,95.3,0,0,0,224,120,96,96,0,0,0,128,24Zm0,128a32,32,0,1,1,32-32A32,32,0,0,1,128,152Z" />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Endereço
                </h2>
                <p className="text-gray-700">Rua José Augusto, 761</p>
                <p className="text-gray-500 text-sm">
                  (Visitas apenas com agendamento)
                </p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Formulário de Contato Direto
            </h2>
            <form id="contactForm" className="space-y-4">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Nome Completo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p id="fullNameError" className="error-message"></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p id="emailError" className="error-message"></p>
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Celular
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Celular (com DDD)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Mensagem"
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                <p id="messageError" className="error-message"></p>
                <p className="text-sm text-gray-500 mt-1 text-right">
                  <span id="charCount">0</span>/500 caracteres
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-green-700 text-white p-3 rounded-lg font-semibold hover:bg-green-800 transition duration-300"
              >
                Enviar Mensagem
              </button>
            </form>
            <div
              id="successModal"
              className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg p-8 shadow-xl max-w-sm w-full text-center">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Mensagem Enviada com Sucesso!
                </p>
                <button
                  id="closeModal"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* <script src="/assets/js/contato.js"></script> */}
    </>
  );
}
