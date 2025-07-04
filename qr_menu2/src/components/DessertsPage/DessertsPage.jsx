import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DessertsPage.module.css';
import { FaStar } from 'react-icons/fa';

const AlergenIcon = ({ type }) => {
    const icons = {
        gluten: { symbol: '🌾', title: 'Gluten İçerir' },
        nuts: { symbol: '🥜', title: 'Fındık/Ceviz İçerir' },
        dairy: { symbol: '🥛', title: 'Süt Ürünü İçerir' },
        egg: { symbol: '🥚', title: 'Yumurta İçerir' },
        soy: { symbol: '🌱', title: 'Soya İçerir' }
    };
    const { symbol = '❔', title = 'Bilinmeyen Alerjen' } = icons[type] || {};
    return <span className={styles.alergenSymbol} title={title}>{symbol}</span>;
};

const DessertsPage = () => {
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/?category=tatlar') // kategori slug'ı 'tatlar' mı?
            .then((res) => {
                setDesserts(res.data);
            })
            .catch((err) => {
                console.error("Tatlılar yüklenemedi:", err);
            });
    }, []);

    return (
        <div className={styles.dessertsPage}>
            <h3 className={styles.sectionTitle}>Tatlılar</h3>
            <div className={styles.dessertList}>
                {desserts.map((dessert) => (
                    <div key={dessert.id} className={styles.dessertCard}>
                        <img src={`http://localhost:8000${dessert.image}`} alt={dessert.name} className={styles.dessertImage} />
                        <div className={styles.dessertInfo}>
                            <div className={styles.rating}><FaStar className={styles.starIcon} /> {dessert.rating}</div>
                            <h4 className={styles.dessertName}>{dessert.name}</h4>
                            <div className={styles.alergenIcons}>
                                {dessert.allergens && dessert.allergens.map((alergen, index) => (
                                    <AlergenIcon key={index} type={alergen} />
                                ))}
                            </div>
                            <p className={styles.dessertDescription}>{dessert.description}</p>
                            <p className={styles.dessertPrice}>{dessert.price}₺</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DessertsPage;
