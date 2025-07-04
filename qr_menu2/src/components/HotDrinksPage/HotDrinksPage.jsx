import React from 'react';
import styles from './HotDrinksPage.module.css'; // HotDrinksPage'e özel CSS modülü
import { FaStar } from 'react-icons/fa'; // Yıldız ikonu için

// Görsel yolları (lütfen doğru olduğundan emin olun):
import hotDrinksBanner from '../../assets/cay.jpg'; // Sıcak içecekler banner görseli
import coffeeImage from '../../assets/limonata.jpg'; // Örnek ürün görseli (diğer içecekler için de kullanılmış)

// Alerjen/Bilgi ikonlarını render eden yardımcı bileşen
const AlergenIcon = ({ type }) => {
    let symbol;
    let title;
    switch (type) {
        case 'dairy':
            symbol = '🥛';
            title = 'Süt Ürünü İçerir';
            break;
        case 'sugar':
            symbol = '🍬';
            title = 'Şeker İçerir';
            break;
        case 'caffeine':
            symbol = '☕';
            title = 'Kafein İçerir';
            break;
        default:
            symbol = '❔';
            title = 'Bilinmeyen Bilgi';
    }
    return <span className={styles.alergenSymbol} title={title}>{symbol}</span>;
};

// Sıcak İçecekler sayfa bileşeni
const HotDrinksPage = () => {
    // Sıcak içecek ürün verileri
    const hotDrinks = [
        {
            id: 1,
            name: 'Latte',
            image: coffeeImage,
            rating: 4.8,
            description: 'Espresso, buharla ısıtılmış süt ve hafif bir süt köpüğü.',
            info: ['dairy', 'caffeine'],
            price: '₺65.00'
        },
        {
            id: 2,
            name: 'Cappuccino',
            image: coffeeImage,
            rating: 4.7,
            description: 'Eşit oranda espresso, buharla ısıtılmış süt ve köpük.',
            info: ['dairy', 'caffeine'],
            price: '₺60.00'
        },
        {
            id: 3,
            name: 'Americano',
            image: coffeeImage,
            rating: 4.6,
            description: 'Sıcak suya eklenmiş espresso, sade ve yoğun.',
            info: ['caffeine'],
            price: '₺55.00'
        },
        {
            id: 4,
            name: 'Türk Kahvesi',
            image: coffeeImage,
            rating: 4.9,
            description: 'Geleneksel, köpüklü ve yoğun Türk kahvesi.',
            info: ['caffeine'],
            price: '₺45.00'
        },
        {
            id: 5,
            name: 'Çay Çeşitleri',
            image: hotDrinksBanner,
            rating: 4.5,
            description: 'Siyah çay, yeşil çay, bitki çayları seçenekleriyle.',
            info: ['caffeine'], // Çay türüne göre kafein değişebilir, genel kabul edilebilir.
            price: '₺40.00'
        },
        {
            id: 6,
            name: 'Sıcak Çikolata',
            image: hotDrinksBanner,
            rating: 4.7,
            description: 'Zengin ve kremalı, kış aylarının vazgeçilmezi.',
            info: ['dairy', 'sugar'],
            price: '₺70.00'
        },
        {
            id: 7,
            name: 'Salep',
            image: coffeeImage,
            rating: 4.6,
            description: 'Tarçınla servis edilen geleneksel kış içeceği.',
            info: ['dairy', 'sugar'],
            price: '₺50.00'
        },
        {
            id: 8,
            name: 'Espresso',
            image: coffeeImage,
            rating: 4.9,
            description: 'Yoğun ve aromatik kahve shotı.',
            info: ['caffeine'],
            price: '₺40.00'
        },
        {
            id: 9,
            name: 'Matcha Latte',
            image: coffeeImage,
            rating: 4.5,
            description: 'Japon yeşil çayı matcha ile hazırlanan, sütlü ve köpüklü içecek.',
            info: ['dairy', 'caffeine'],
            price: '₺75.00'
        },
        {
            id: 10,
            name: 'Filtre Kahve',
            image: coffeeImage,
            rating: 4.7,
            description: 'Günlük keyifler için demlenmiş sade kahve.',
            info: ['caffeine'],
            price: '₺50.00'
        },
    ];

    // "KEŞFET" butonuna basıldığında tetiklenecek fonksiyon
    const handleDiscoverClick = () => {
        alert("Sıcak İçecekler Keşfet butonuna basıldı!");
    };

    // Ürün kartına tıklandığında tetiklenecek fonksiyon
    const handleProductClick = (productId) => {
        alert(`Sıcak İçecek ID: ${productId} detay sayfasına gidiliyor.`);
    };

    return (
        <div className={styles.hotDrinksPage}>
            {/* Banner bölümü */}
            <div className={styles.bannerContainer}>
                <img src={hotDrinksBanner} alt="Sıcak İçecekler" className={styles.bannerImage} />
                <div className={styles.bannerOverlay}>
                    <h2 className={styles.bannerTitle}>Günün Kahvesi <br /> Sıcak ve Lezzetli</h2>
                    <p className={styles.bannerDescription}>Açıklama</p> {/* Bu açıklama kısmını güncelleyebilirsiniz */}
                    <button className={styles.discoverButton} onClick={handleDiscoverClick}>KEŞFET</button>
                </div>
            </div>

            {/* Popüler İçecekler bölümü */}
            <div className={styles.hotDrinksSection}>
                <h3 className={styles.sectionTitle}>Popüler İçecekler</h3>
                <div className={styles.hotDrinkList}>
                    {hotDrinks.map((drink) => (
                        <div key={drink.id} className={styles.hotDrinkCard} onClick={() => handleProductClick(drink.id)}>
                            <img src={drink.image} alt={drink.name} className={styles.hotDrinkImage} />
                            <div className={styles.hotDrinkInfo}>
                                <div className={styles.rating}>
                                    <FaStar className={styles.starIcon} /> {drink.rating}
                                </div>
                                <h4 className={styles.hotDrinkName}>{drink.name}</h4>
                                <div className={styles.infoIcons}>
                                    {drink.info && drink.info.map((item, index) => (
                                        <AlergenIcon key={index} type={item} />
                                    ))}
                                </div>
                                <p className={styles.hotDrinkDescription}>{drink.description}</p>
                                <p className={styles.hotDrinkPrice}>{drink.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Yeni Eklenenler bölümü (Liste tersine çevrilmiş) */}
            <div className={styles.hotDrinksSection}>
                <h3 className={styles.sectionTitle}>Yeni Eklenenler</h3>
                <div className={styles.hotDrinkList}>
                    {/* hotDrinks dizisini kopyalayıp tersine çeviriyoruz, orijinal diziyi etkilememek için */}
                    {[...hotDrinks].reverse().map((drink) => (
                        <div key={`alt-${drink.id}`} className={styles.hotDrinkCard} onClick={() => handleProductClick(drink.id)}>
                            <img src={drink.image} alt={drink.name} className={styles.hotDrinkImage} />
                            <div className={styles.hotDrinkInfo}>
                                <div className={styles.rating}>
                                    <FaStar className={styles.starIcon} /> {drink.rating}
                                </div>
                                <h4 className={styles.hotDrinkName}>{drink.name}</h4>
                                <div className={styles.infoIcons}>
                                    {drink.info && drink.info.map((item, index) => (
                                        <AlergenIcon key={index} type={item} />
                                    ))}
                                </div>
                                <p className={styles.hotDrinkDescription}>{drink.description}</p>
                                <p className={styles.hotDrinkPrice}>{drink.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sayfanın altına boşluk bırakmak için */}
            <div style={{ height: '80px' }}></div>
        </div>
    );
};

export default HotDrinksPage;