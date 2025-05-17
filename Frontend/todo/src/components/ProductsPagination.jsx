// ProductsPagination.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductsPagination({ itemsPerPage = 1, pageNeighbours = 1 }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  // generate page numbers with neighbours and ellipses
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 1 + 1; // current + neighbours + first + last
    const totalBlocks = totalNumbers + 1; // including ellipses

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    if (hasLeftSpill && !hasRightSpill) {
      const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - spillOffset + i);
      pages = [LEFT, ...extraPages, ...pages];
    } else if (!hasLeftSpill && hasRightSpill) {
      const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
      pages = [...pages, ...extraPages, RIGHT];
    } else if (hasLeftSpill && hasRightSpill) {
      pages = [LEFT, ...pages, RIGHT];
    }

    return [1, ...pages, totalPages];
  };

  const pages = fetchPageNumbers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const goToPage = page => setCurrentPage(page);

  return (
    <div>
      <ul>
        {currentItems.map(item => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <strong>{item.title}</strong><br />
            Price: ${item.price}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '16px' }}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>

        {pages.map((page, index) => {
          if (page === 'LEFT') return <span key={index} style={{ margin: '0 4px' }}>...</span>;
          if (page === 'RIGHT') return <span key={index} style={{ margin: '0 4px' }}>...</span>;
          return (
            <button
              key={index}
              onClick={() => goToPage(page)}
              style={{
                marginLeft: '4px',
                fontWeight: currentPage === page ? 'bold' : 'normal'
              }}
            >
              {page}
            </button>
          );
        })}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ marginLeft: '4px' }}>
          Next
        </button>
      </div>
    </div>
  );
}
