// ProductsLoader.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductsLoader({ pageSize = 5 }) {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const loadMore = () => {
    setVisibleCount(count => Math.min(count + pageSize, allProducts.length));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <ul>
        {visibleProducts.map(item => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <strong>{item.title}</strong><br />
            Price: ${item.price}
          </li>
        ))}
      </ul>

      {hasMore ? (
        <button onClick={loadMore}>Load More</button>
      ) : (
        <p>All products loaded.</p>
      )}
    </div>
  );
}
