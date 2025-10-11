"use client";

import {
  Badge,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "react-bootstrap";
import React, { useState } from "react";
import LocationIcon from "../../assets/images/location_icon_agroshop.svg";
import Image from "next/image";
import CarrinhoIcon from "../Icons/CarrinhoIcon";
import styles from "./header.module.scss";
import NewAddressModal from "../NewAddressModal";
import { useCart } from "../../contexts/CartContext";

// Dados iniciais para simular endereços já salvos.
const initialAddresses = [
  { id: 1, apelido: "Casa", logradouro: "Alameda Alaska", numero: "1145" },
  {
    id: 2,
    apelido: "Trabalho",
    logradouro: "Avenida Pedro Teixeira",
    numero: "2145",
  },
  { id: 3, apelido: "Outro", logradouro: "Rua das Gaivotas", numero: "123" },
];

export default function SalesBar() {
  // 1. A lista de endereços agora é um estado.
  const [addresses, setAddresses] = useState(initialAddresses);

  // 2. O endereço selecionado também é um estado, guardando o objeto completo.
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const { totalItems, toggleModal } = useCart();

  // 3. Função para adicionar um novo endereço ao estado.
  const handleAddAddress = (newAddressData) => {
    const newAddress = {
      id: Date.now(), // Usamos um ID simples e único para a chave
      ...newAddressData,
    };

    // Atualiza a lista de endereços e já seleciona o novo.
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setSelectedAddress(newAddress);

    // Fecha o modal após salvar.
    setShowAddressModal(false);
  };

  return (
    <>
      <Container fluid className={styles.salesBar}>
        <Container className="p-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <Image
                src={LocationIcon}
                alt={"Ícone localização"}
                width={26}
                height={26}
              />
              <Dropdown>
                <DropdownToggle as={"div"} className={styles.addressDropdown}>
                  <span className={styles.deliveryLabel}> Entregar em </span>
                  {/* Exibe o endereço selecionado a partir do estado */}
                  <span className={styles.deliveryAddress}>
                    {`${selectedAddress.logradouro}, ${selectedAddress.numero}`}
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  {/* 4. Renderiza a lista de endereços dinamicamente a partir do estado */}
                  {addresses.map((addr) => (
                    <Dropdown.Item
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                    >
                      <strong>{addr.apelido}:</strong>{" "}
                      {`${addr.logradouro}, ${addr.numero}`}
                    </Dropdown.Item>
                  ))}
                  <DropdownDivider />
                  <DropdownItem
                    onClick={() => setShowAddressModal(true)}
                    alt={"Botão Adicionar novo endereço"}
                    className="text-center"
                  >
                    Adicionar endereço
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Button
              variant="link"
              className={`${styles.cartButton} d-flex align-items-center text-decoration-none gap-1 p-0 position-relative`}
              onClick={toggleModal}
            >
              <span>Carrinho</span>
              <CarrinhoIcon className={styles.cartIcon} />
              <Badge
                pill
                bg={"danger"}
                className={"position-absolute top-0 start-100 translate-middle"}
              >
                {totalItems}
              </Badge>
            </Button>
          </div>
        </Container>
      </Container>
      <NewAddressModal
        show={showAddressModal}
        onHide={() => setShowAddressModal(false)}
        // 5. Passa a função de salvar como uma prop para o modal.
        onAddressSave={handleAddAddress}
      />
    </>
  );
}
