// src/redux/reducers.js
import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    TOGGLE_VIEW
  } from './actions';
  
  const initialState = {
    products: []
  };
  
  export default function productReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products, action.payload]
        };
  
      case UPDATE_PRODUCT:
        return {
          ...state,
          products: state.products.map(p =>
            // return the full payload when IDs match
            p.id === action.payload.id ? action.payload : p
          )
        };
  
      case DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(p => p.id !== action.payload)
        };
  
      case TOGGLE_VIEW:
        return {
          ...state,
          products: state.products.map(p =>
            // return a new object with toggled `visible`, or the original
            p.id === action.payload
              ? { ...p, visible: !p.visible }
              : p
          )
        };
  
      default:
        return state;
    }
  }
  