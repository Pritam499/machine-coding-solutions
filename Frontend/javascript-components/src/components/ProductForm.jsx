// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../redux/actions';

const ProductForm = ({ editProduct, onFinish }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setDetails(editProduct.details);
    } else {
      setName('');
      setDetails('');
    }
  }, [editProduct]);

  const handleSubmit = e => {
    e.preventDefault();
    const product = {
      id: editProduct ? editProduct.id : Date.now(),
      name,
      details,
      visible: true,
    };

    if (editProduct) dispatch(updateProduct(product));
    else dispatch(addProduct(product));

    // clear form and exit edit mode
    onFinish?.();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Product Details"
        value={details}
        onChange={e => setDetails(e.target.value)} 
        required
      />

      <button type="submit">
        {editProduct ? 'Update' : 'Add'} Product
      </button>
    </form>
  );
};

export default ProductForm;
