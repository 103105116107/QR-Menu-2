// src/components/CategoriesPage.jsx
import React, { useEffect, useState } from 'react'; // useEffect ve useState hook'larını ekledik
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './CategoriesPage.module.css';
import axios from 'axios'; // Axios'u kullanmaya devam ediyoruz

// Önemli Not: Artık kategorileri backend'den çekeceğimiz için,
// bu yerel görsel varlık import'larına doğrudan ihtiyacımız kalmayacak.
// Ancak, eğer backend'den resim gelmezse veya bir placeholder göstermek isterseniz
// bunları kullanmaya devam edebilirsiniz. Şimdilik yorum satırı yapıyorum:
// import anayemek from '../../assets/anayemek.jpg';
// import baslangic from '../../assets/baslangic.jpg';
// import limonata from '../../assets/limonata.jpg';
// import corba from '../../assets/corba.jpg';
// import cay from '../../assets/cay.jpg';
// import salata from '../../assets/salata.jpg';
// import tatli from '../../assets/tatli.jpg';

// Django backend'inizin temel URL'si
const API_BASE_URL = 'http://localhost:8000'; // Kendi Django sunucunuzun adresini buraya yazın

const CategoriesPage = ({ onCategoryClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [categories, setCategories] = useState([]); // Backend'den gelen kategoriler için yeni state
    const [loading, setLoading] = useState(true); // Yükleme durumu
    const [error, setError] = useState(null); // Hata durumu

    // Kategorileri backend'den çekmek için useEffect kullanıyoruz
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true); // Yüklemeyi başlat
                const response = await axios.get(`${API_BASE_URL}/api/categories/`);
                setCategories(response.data); // Gelen veriyi state'e kaydet
                setError(null); // Hata varsa temizle
            } catch (err) {
                console.error("Kategoriler çekilirken hata oluştu:", err);
                setError("Kategoriler yüklenirken bir sorun oluştu."); // Kullanıcıya gösterilecek hata mesajı
            } finally {
                setLoading(false); // Yüklemeyi bitir
            }
        };

        fetchCategories();
    }, []); // Boş bağımlılık dizisi, bileşen yüklendiğinde bir kez çalışmasını sağlar

    // Arama sorgusuna göre filtrelenmiş kategoriler
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchClick = () => {
        setIsSearchActive(true);
    };

    const handleCloseSearch = () => {
        setIsSearchActive(false);
        setSearchQuery('');
    };

    // Yükleme veya hata durumlarını kullanıcıya gösterme
    if (loading) {
        return (
            <div className={styles.categoriesPage}>
                <header className={styles.appHeader}>
                    <h1 className={styles.appTitle}>Food App</h1>
                </header>
                <main className={styles.mainContent}>
                    <div className={styles.loadingMessage}>Kategoriler yükleniyor...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.categoriesPage}>
                <header className={styles.appHeader}>
                    <h1 className={styles.appTitle}>Food App</h1>
                </header>
                <main className={styles.mainContent}>
                    <div className={styles.errorMessage}>{error} Lütfen daha sonra tekrar deneyin.</div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.categoriesPage}>
            <header className={styles.appHeader}>
                {!isSearchActive ? (
                    <>
                        <h1 className={styles.appTitle}>Food App</h1>
                        <button className={styles.searchButton} onClick={handleSearchClick}>
                            <FiSearch />
                        </button>
                    </>
                ) : (
                    <div className={styles.searchContainer}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Favori yemeğini ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                            autoFocus
                        />
                        <button className={styles.closeSearch} onClick={handleCloseSearch}>
                            <FiX />
                        </button>
                    </div>
                )}
            </header>

            <main className={styles.mainContent}>
                <div className={styles.categoriesContainerVertical}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => ( // Artık index yerine category.id kullanabiliriz
                            // Kategoriye tıklandığında parent'a onCategoryClick ile bildiriyoruz
                            <div
                                key={category.id} // Django'dan gelen id'yi key olarak kullanıyoruz
                                className={styles.categoryItem}
                                onClick={() => onCategoryClick(category.id)} // Kategori ID'sini gönderiyoruz
                            >
                                <img
                                    // Django'dan gelen banner_image URL'sini kullanıyoruz
                                    // Eğer resim yoksa veya yüklenemezse bir placeholder gösterebiliriz
                                    src={category.banner_image ? `${API_BASE_URL}${category.banner_image}` : 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image'}
                                    alt={category.name}
                                    className={styles.categoryImage}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error'; }} // Resim yüklenmezse hata görseli
                                />
                                <div className={styles.categoryText}>
                                    <h3 className={styles.categoryName}>{category.name}</h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>Sonuç bulunamadı.</div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CategoriesPage;