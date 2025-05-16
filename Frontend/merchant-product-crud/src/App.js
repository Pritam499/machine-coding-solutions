import './App.css';
import React from 'react';
import {ProductProvider} from './context/ProductContext.jsx';
import ProductManager from './components/ProductManager.jsx'

function App() {
  return (
    <ProductProvider>
      <div>
        <h1>Merchant Product Manager</h1>
        <ProductManager/>
      </div>
      
    </ProductProvider>
  );
}

export default App;
