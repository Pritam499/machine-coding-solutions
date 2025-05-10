export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';

export const addProduct = product => ({type: ADD_PRODUCT, payload: product})
export const updateProduct = product => ({type: UPDATE_PRODUCT, payload: product})
export const deleteProduct = id => ({type: DELETE_PRODUCT, payload: id});
export const toggleView = id => ({type: TOGGLE_VIEW, payload: id});