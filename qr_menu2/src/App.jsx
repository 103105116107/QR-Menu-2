import React, { useState } from 'react';
import './App.css'; // Genel uygulama stilleriniz
import BottomNavBar from './components/BottomNavBar';
import DessertsPage from './components/DessertsPage/DessertsPage';
import CategoriesPage from './components/CategoriesPage/CategoriesPage';
import HotDrinksPage from './components/HotDrinksPage/HotDrinksPage';
import CommentsPage from './components/CommentsPage/CommentsPage';
import MakeCommentPage from './components/MakeCommentPage/MakeCommentPage'; // CommentPage adını MakeCommentPage olarak değiştirdik

const App = () => {
  // Başlangıçta ana sayfayı göster
  const [activeTab, setActiveTab] = useState('home');

  // Bu fonksiyon, tab değiştiğinde veya sayfa değişimi gerektiğinde çağrılır
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      {/* activeTab'a göre hangi bileşenin render edileceğini belirliyoruz */}
      {activeTab === 'home' && <CategoriesPage onCategoryClick={handleTabChange} />}
      {activeTab === 'desserts' && <DessertsPage />}
      {activeTab === 'hot-drinks' && <HotDrinksPage />}

      {/* Yorumlar sayfası: Eğer 'comment' sekmesindeysek CommentsPage'i göster */}
      {activeTab === 'comment' && (
        // CommentsPage'e, yorum yapma sayfasına geçiş için bir prop iletiyoruz
        <CommentsPage onMakeCommentClick={() => handleTabChange('make-comment')} />
      )}

      {/* Yorum Yapma sayfası: Eğer 'make-comment' sekmesindeysek MakeCommentPage'i göster */}
      {activeTab === 'make-comment' && (
        // MakeCommentPage'e, yorum gönderildikten veya geri dönüldükten sonra CommentsPage'e dönmek için bir prop iletiyoruz
        <MakeCommentPage onGoBack={() => handleTabChange('comment')} />
      )}

      {/* Alt navigasyon çubuğu her zaman görünür olacak */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;