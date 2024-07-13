import React from "react";
import { CartProvider } from "@/context/CartContext";
// import { CartProvider } from "../context/CartContext.jsx";

import { ModalCartProvider } from "@/context/ModalCartContext";
// import { ModalCartProvider } from "../context/ModalCartContext.jsx";

import { WishlistProvider } from "@/context/WishlistContext";
// import { WishlistProvider } from "../context/WishlistContext.jsx";

import { ModalWishlistProvider } from "@/context/ModalWishlistContext";
// import { ModalWishlistProvider } from "../context/ModalWishlistContext.jsx";

import { CompareProvider } from "@/context/CompareContext";
// import { CompareProvider } from "../context/CompareContext.jsx";

import { ModalCompareProvider } from "@/context/ModalCompareContext";
// import { ModalCompareProvider } from "../context/ModalCompareContext.jsx";

import { ModalSearchProvider } from "@/context/ModalSearchContext";
// import { ModalSearchProvider } from "../context/ModalSearchContext.jsx";

import { ModalQuickviewProvider } from "@/context/ModalQuickviewContext";
// import { ModalQuickviewProvider } from "../context/ModalQuickviewContext.jsx";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CartProvider>
      <ModalCartProvider>
        <WishlistProvider>
          <ModalWishlistProvider>
            <CompareProvider>
              <ModalCompareProvider>
                <ModalSearchProvider>
                  <ModalQuickviewProvider>{children}</ModalQuickviewProvider>
                </ModalSearchProvider>
              </ModalCompareProvider>
            </CompareProvider>
          </ModalWishlistProvider>
        </WishlistProvider>
      </ModalCartProvider>
    </CartProvider>
  );
};

export default GlobalProvider;
