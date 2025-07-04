import React, { useState } from 'react';
import './App.css'; 
import BottomNavBar from './components/BottomNavBar';
import DessertsPage from './components/DessertsPage/DessertsPage';
import CategoriesPage from './components/CategoriesPage/CategoriesPage';
import HotDrinksPage from './components/HotDrinksPage/HotDrinksPage';
import CommentsPage from './components/CommentsPage/CommentsPage';
import MakeCommentPage from './components/MakeCommentPage/MakeCommentPage';

const App = () => {

  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      {}
      {activeTab === 'home' && <CategoriesPage onCategoryClick={handleTabChange} />}
      {activeTab === 'desserts' && <DessertsPage />}
      {activeTab === 'hot-drinks' && <HotDrinksPage />}

      {}
      {activeTab === 'comment' && (
      
        <CommentsPage onMakeCommentClick={() => handleTabChange('make-comment')} />
      )}

      {}
      {activeTab === 'make-comment' && (
        <MakeCommentPage onGoBack={() => handleTabChange('comment')} />
      )}

      {}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;
