import { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext(undefined);

// Ações do carrinho
export const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
};

// Estado inicial do carrinho
const initialState = {
  items: [],
  isModalOpen: false,
  totalItems: 0,
  totalPrice: 0,
  notification: null,
};

// Reducer para gerenciar estado do carrinho
function cartReducer(state, action) {
  if (action.type === "__HYDRATE__") {
    return {
      ...state,
      ...action.payload,
    };
  }

  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { productId } = action.payload;
      const newItems = state.items.filter((item) => item.id !== productId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      const newItems = state.items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0);

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case CART_ACTIONS.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };

    case CART_ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    case CART_ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };

    default:
      return state;
  }
}

// Provider do contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Salvar carrinho no localStorage sempre que o estado mudar
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const cartToSave = {
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      };
      localStorage.setItem("agroshop-cart", JSON.stringify(cartToSave));
    } catch (error) {
      console.error("Erro ao salvar carrinho no localStorage:", error);
    }
  }, [state.items, state.totalItems, state.totalPrice, isHydrated]);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("agroshop-cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({
          type: "__HYDRATE__",
          payload: {
            ...parsedCart,
            isModalOpen: false,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho do localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product } });
    dispatch({
      type: CART_ACTIONS.SET_NOTIFICATION,
      payload: {
        message: `${product.name} adicionado ao carrinho!`,
        type: "success",
        duration: 2000,
      },
    });
  };

  const removeFromCart = (productId) => {
    const product = state.items.find((item) => item.id === productId);
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { productId } });
    if (product) {
      dispatch({
        type: CART_ACTIONS.SET_NOTIFICATION,
        payload: {
          message: `${product.name} removido do carrinho`,
          type: "info",
          duration: 2000,
        },
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    const product = state.items.find((item) => item.id === productId);
    const oldQuantity = product?.quantity || 0;

    // Validações de quantidade
    if (quantity < 0) {
      dispatch({
        type: CART_ACTIONS.SET_NOTIFICATION,
        payload: {
          message: "Quantidade não pode ser negativa",
          type: "error",
          duration: 2000,
        },
      });
      return;
    }

    if (quantity > 99) {
      dispatch({
        type: CART_ACTIONS.SET_NOTIFICATION,
        payload: {
          message: "Quantidade máxima permitida é 99 unidades",
          type: "warning",
          duration: 2000,
        },
      });
      return;
    }

    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, quantity },
    });

    if (product && quantity > oldQuantity) {
      dispatch({
        type: CART_ACTIONS.SET_NOTIFICATION,
        payload: {
          message: `Quantidade de ${product.name} aumentada`,
          type: "success",
          duration: 1500,
        },
      });
    } else if (product && quantity < oldQuantity && quantity > 0) {
      dispatch({
        type: CART_ACTIONS.SET_NOTIFICATION,
        payload: {
          message: `Quantidade de ${product.name} diminuída`,
          type: "info",
          duration: 1500,
        },
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    dispatch({
      type: CART_ACTIONS.SET_NOTIFICATION,
      payload: {
        message: "Carrinho limpo com sucesso!",
        type: "warning",
        duration: 2000,
      },
    });
  };

  const toggleModal = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_MODAL });
  };

  const clearNotification = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_NOTIFICATION });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleModal,
    clearNotification,
  };

  if (!isHydrated) return null;
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook para usar o contexto
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("useCart deve ser usado dentro de um CartProvider");
    }
    // Retorna um objeto vazio para evitar crash, mas alerta o dev
    return {};
  }
  return context;
}
