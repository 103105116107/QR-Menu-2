import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductListPage.css'; 
const API_BASE_URL = 'http://localhost:8000';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/`);
                setProducts(response.data);
            } catch (err) {
                console.error("Ürünler alınırken hata:", err);
            }
        };

        fetchProducts();
    }, []);

    return (
<div className="productListPage">
  <h2 className="title">Ürünler</h2>

  <div className="productList">
    {products.map((product) => (
      <div key={product.id} className="productItem">
        <img
          className="productImage"
          src={product.image ? `${API_BASE_URL}${product.image}` : 'https://placehold.co/150x150'}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/150x150';
          }}
        />
        <div className="productDetails">
          <h3 className="productName">{product.name}</h3>
          <p className="productPrice">₺{product.price}</p>
          <p className="productDescription">Kategori: {product.category}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    );
};

export default ProductListPage;
