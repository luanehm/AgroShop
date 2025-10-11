import styles from "./header.module.scss";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Icons/AgroShopIcon";
import LupaIcon from "../../assets/images/lupa_agroshop.svg";
import UserIcon from "../../assets/images/icon-produtor.png";

import React from "react";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function NavBar() {
  return (
    <Navbar
      className={`${styles.navBar} py-0 my-0`}
      expand="lg"
      data-bs-theme="dark"
    >
      <Container>
        <NavbarBrand href="/">
          <Logo width={75} height={75} />
        </NavbarBrand>

        <Form
          className={`${styles.searchBar} flex-grow-1 me-auto px-3`}
          data-bs-theme="light"
        >
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Pesquise aqui por frutas, legumes, produtores..."
              aria-label="Buscar"
              className="rounded-start-3 border-0 shadow-none"
            ></FormControl>

            <InputGroupText
              className={`${styles.lupaContainer} bg-white rounded-end-3`}
            >
              <Image
                src={LupaIcon}
                alt="Lupa Logo"
                width={18}
                height={18}
                className={styles.lupaIcon}
                aria-hidden={true}
              />
            </InputGroupText>
          </InputGroup>
        </Form>

        <Nav className="align-items-center">
          <NavLink href="/">Início</NavLink>
          <NavLink href="/categoria">Categorias</NavLink>
          <NavLink href="/contato">Contatos</NavLink>
          <NavLink href="/" className="ps-3">
            <Image
              src={UserIcon}
              alt="Ícone do Usuário"
              width={40}
              height={40}
            />
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
