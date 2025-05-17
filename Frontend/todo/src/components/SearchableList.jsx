import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchableList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFiltered([]); // Do not show anything initially
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === '') {
        setFiltered([]); // Show nothing if search is empty
      } else {
        const result = products.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
        setFiltered(result);
      }
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [search, products]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.map(p => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}

export default SearchableList;
