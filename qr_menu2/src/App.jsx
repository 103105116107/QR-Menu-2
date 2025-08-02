import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import './App.css';
import BottomNavBar from './components/BottomNavBar';
import CategoriesPage from './components/CategoriesPage/CategoriesPage';
import CommentsPage from './components/CommentsPage/CommentsPage';
import MakeCommentPage from './components/MakeCommentPage/MakeCommentPage';
import CategoryProductPage from './components/CategoryProductPage/CategoryProductPage';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL'ye göre aktif tab'ı belirle
  let activeTab = 'home';
  if (location.pathname.startsWith('/comments')) activeTab = 'comment';
  else if (location.pathname.startsWith('/make-comment')) activeTab = 'make-comment';

  // BottomNavBar için tab değiştirici fonksiyon
  const handleTabChange = (tab) => {
    if (tab === 'home') navigate('/');
    else if (tab === 'comment') navigate('/comments');
    else if (tab === 'make-comment') navigate('/make-comment');
    // Diğer sekmeler popup olduğu için burada yönlendirme yok
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<CategoriesPage onCategoryClick={(id) => navigate(`/category-products/${id}`)} />} />
        <Route path="/comments" element={<CommentsPage onMakeCommentClick={() => navigate('/make-comment')} />} />
        <Route path="/make-comment" element={<MakeCommentPage onGoBack={() => navigate('/comments')} />} />
        <Route path="/category-products/:categoryId" element={<CategoryProductPageWrapper />} />
      </Routes>

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

const CategoryProductPageWrapper = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  return <CategoryProductPage categoryId={categoryId} onGoBack={() => navigate('/')} />;
};

export default App;
