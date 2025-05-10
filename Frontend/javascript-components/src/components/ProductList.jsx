// src/components/ProductList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, toggleView } from '../redux/actions';
import ProductForm from './ProductForm';

export default function ProductList() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  return (
    <div>
      {/* Always show the “Add” form when not editing */}
      {!editing && <ProductForm onFinish={() => {}} />}

      {/* Show the “Edit” form when a product is being edited */}
      {editing && (
        <ProductForm
          editProduct={editing}
          onFinish={() => setEditing(null)}
        />
      )}

      {/* Now you’ll see this populated as you add */}
      {products.map(prod => (
        <div
          key={prod.id}
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}
        >
          <h3>{prod.name}</h3>
          {prod.visible && <p>{prod.details}</p>}
          <button onClick={() => dispatch(toggleView(prod.id))}>
            {prod.visible ? 'Hide' : 'Show'} Details
          </button>
          <button onClick={() => setEditing(prod)}>Edit</button>
          <button onClick={() => dispatch(deleteProduct(prod.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
