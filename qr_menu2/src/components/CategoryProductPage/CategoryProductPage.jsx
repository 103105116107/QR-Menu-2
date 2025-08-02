import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryProductPage.css';

const API_BASE_URL = 'http://localhost:8000';

const CategoryProductPage = ({ categoryId, onGoBack }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/products/category/${categoryId}/`)
            .then(res => setProducts(res.data))
            .catch(err => console.error("Ürünler alınamadı:", err));
    }, [categoryId]);

    return (
        <div className="category-product-page">
            <h2>Kategorideki Ürünler</h2>
            <button onClick={onGoBack}>← Geri</button>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image ? `${API_BASE_URL}${product.image}` : 'https://placehold.co/120x120'} alt={product.name} />
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p>Kategori: {product.category}</p>
                            <p>₺{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProductPage;
