import Head from "next/head";
import { CartProvider } from "../contexts/CartContext";

const TestImages = () => {
  const testImages = [
    "/assets/images/batata_inglesa.png",
    "/assets/images/batata_doce.png",
    "/assets/images/mandioca.png",
    "/assets/images/logo.png",
  ];

  return (
    <>
      <Head>
        <title>Teste de Imagens - AgroShop</title>
      </Head>
      <div style={{ padding: "20px" }}>
        <h1>Teste de Imagens</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {testImages.map((src, index) => (
            <div
              key={index}
              style={{
                border: "2px solid #28a745",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>Imagem {index + 1}</h3>
              <p>Caminho: {src}</p>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                  margin: "10px 0",
                }}
              >
                <img
                  src={src}
                  alt={`Teste ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    console.log(`Erro na imagem ${index + 1}:`, e.target.src);
                    e.target.style.display = "none";
                  }}
                  onLoad={() => {
                    console.log(`Imagem ${index + 1} carregou:`, src);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestImages;

