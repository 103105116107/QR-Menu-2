import React, { useState } from 'react';
import styles from './BottomNavBar.module.css';
import { FaCommentDots, FaHandPaper, FaHome, FaWifi, FaGlobe } from 'react-icons/fa';


const BottomNavBar = ({ activeTab, onTabChange }) => {
    const [showPopup, setShowPopup] = useState(null);

    const handleItemClick = (item) => {
        // Eğer aynı sekmeye basılırsa pop-up'ı kapat
        if (activeTab === item && (item !== 'home' && item !== 'comment')) {
            setShowPopup(null);
            return;
        }

        if (item === 'home' || item === 'comment') { // home veya comment'e basıldığında pop-up gösterme
            setShowPopup(null); // Açık bir pop-up varsa kapat
            onTabChange(item); // Sayfa değişimini tetikle
        } else {
            // Diğer butonlar için pop-up'ları göster
            setShowPopup(item);
        }
    };

    const handleWaiterCall = (confirmed) => {
        if (confirmed) {
            alert("Garson çağrısı onaylandı!");
        } else {
            alert("Garson çağrısı iptal edildi.");
        }
        setShowPopup(null);
    };

    const handleLanguageSelect = (lang) => {
        alert(`Dil ${lang} olarak ayarlandı.`);
        setShowPopup(null);
    };

    const wifiPassword = "MyRestaurantWifiPassword123";

    return (
        <div className={styles.navBarContainer}>
            <div
                className={`${styles.navItem} ${activeTab === 'comment' ? styles.active : ''}`}
                onClick={() => handleItemClick('comment')}
            >
                <FaCommentDots />
            </div>

            <div
                className={`${styles.navItem} ${showPopup === 'hand' ? styles.active : ''}`}
                onClick={() => handleItemClick('hand')}
            >
                <FaHandPaper />
                {showPopup === 'hand' && (
                    <div className={styles.popup}>
                        Garson çağır
                        <div className={styles.popupActions}>
                            <button className={styles.confirmButton} onClick={() => handleWaiterCall(true)}>
                                ✔
                            </button>
                            <button className={styles.cancelButton} onClick={() => handleWaiterCall(false)}>
                                ✖
                            </button>
                        </div>
                    </div>
                )}
            </div>

            { }
            <div
                className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
                onClick={() => handleItemClick('home')}
            >
                <FaHome />
            </div>

            <div
                className={`${styles.navItem} ${showPopup === 'wifi' ? styles.active : ''}`}
                onClick={() => handleItemClick('wifi')}
            >
                <FaWifi />
                {showPopup === 'wifi' && (
                    <div className={styles.popup}>
                        Wi-Fi Şifresi: <br />
                        <strong>{wifiPassword}</strong>
                    </div>
                )}
            </div>

            <div
                className={`${styles.navItem} ${showPopup === 'globe' ? styles.active : ''}`}
                onClick={() => handleItemClick('globe')}
            >
                <FaGlobe />
                {showPopup === 'globe' && (
                    <div className={styles.popup}>
                        <div className={styles.languageOption} onClick={() => handleLanguageSelect('English')}>English</div>
                        <div className={styles.languageOption} onClick={() => handleLanguageSelect('Türkçe')}>Türkçe</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomNavBar;