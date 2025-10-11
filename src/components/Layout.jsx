import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartModal from "../components/CartModal";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
      <CartModal />
    </>
  );
}
