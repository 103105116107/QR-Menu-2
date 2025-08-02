
import React, { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './CategoriesPage.module.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const CategoriesPage = ({ onCategoryClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/categories/`);
                setCategories(response.data);
                setError(null);
            } catch (err) {
                console.error("Kategoriler çekilirken hata oluştu:", err);
                setError("Kategoriler yüklenirken bir sorun oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


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
                        filteredCategories.map((category) => (

                            <div
                                key={category.id}
                                className={styles.categoryItem}
                                onClick={() => onCategoryClick(category.id)}
                            >
                                <img

                                    src={category.banner_image ? `${API_BASE_URL}${category.banner_image}` : 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image'}
                                    alt={category.name}
                                    className={styles.categoryImage}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error'; }}
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