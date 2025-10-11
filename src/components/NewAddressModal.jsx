import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//Recebe a nova prop `onAddressSave` para se comunicar com o componente pai.
export default function NewAddressModal({ show, onHide, onAddressSave }) {
  const [formData, setFormData] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    apelido: "",
  });

  const [cepError, setCepError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const numeroInputRef = useRef(null);

  // Função para resetar o formulário quando o modal for fechado
  useEffect(() => {
    if (!show) {
      setFormData({
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        apelido: "",
      });
      setCepError("");
      setIsLoading(false);
    }
  }, [show]);

  const clearAddressFields = () => {
    setFormData((prev) => ({
      ...prev,
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
    }));
    setCepError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "cep") {
      const maskedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{5})(\d)/, "$1-$2");
      setFormData((prev) => ({ ...prev, [name]: maskedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCepBlur = async (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    setCepError("");
    if (cep.length !== 8) {
      clearAddressFields();
      if (cep.length > 0) setCepError("CEP inválido.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        clearAddressFields();
        setCepError("CEP não encontrado.");
      } else {
        setFormData((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        }));
        numeroInputRef.current?.focus();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      clearAddressFields();
      setCepError("Não foi possível buscar o CEP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Chama a função `onAddressSave` recebida via props,
    // passando os dados do formulário para o componente pai.
    if (onAddressSave) {
      onAddressSave(formData);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Novo Endereço</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p className="text-muted mb-4">
            Preencha os dados abaixo para cadastrar um novo local de entrega.
          </p>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                maxLength="9"
                disabled={isLoading}
                isInvalid={!!cepError}
              />
              <Form.Control.Feedback type="invalid">
                {cepError}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formLogradouro">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="logradouro"
                placeholder={isLoading ? "Buscando..." : "Rua, Avenida, etc."}
                value={formData.logradouro}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                placeholder="Ex: 123"
                ref={numeroInputRef}
                value={formData.numero}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>
                Complemento <small className="text-muted">(Opcional)</small>
              </Form.Label>
              <Form.Control
                type="text"
                name="complemento"
                placeholder="Apto, bloco, casa"
                value={formData.complemento}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                placeholder="Seu bairro"
                value={formData.bairro}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={8} className="mb-3 mb-md-0">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="localidade"
                placeholder="Sua cidade"
                value={formData.localidade}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} md={4}>
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="uf"
                placeholder="UF"
                maxLength="2"
                value={formData.uf}
                onChange={handleChange}
                disabled={isLoading}
              />
            </Form.Group>
          </Row>
          <hr className="my-4" />
          <Row>
            <Form.Group as={Col} controlId="formApelido">
              <Form.Label>Apelido do endereço</Form.Label>
              <Form.Control
                type="text"
                name="apelido"
                placeholder="Ex: Casa, Trabalho"
                value={formData.apelido}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Salvar Endereço"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
