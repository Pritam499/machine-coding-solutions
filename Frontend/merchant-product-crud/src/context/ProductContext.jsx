import React, { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = { products: [], nextId: 1 };

function productReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      const newProduct = { id: state.nextId, ...action.payload };
      return {
        ...state,
        products: [...state.products, newProduct],
        nextId: state.nextId + 1,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
