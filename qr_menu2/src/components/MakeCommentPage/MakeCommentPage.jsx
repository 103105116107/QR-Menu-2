import React, { useState } from 'react';
import axios from 'axios';
import './MakeCommentPage.css'; 

const API_BASE_URL = 'http://localhost:8000';

const CommentPage = ({ onGoBack }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); 
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/comments/`, {
                text: comment,
                rating: rating,
                author: author || 'Anonim'
            });
            alert('Yorum gönderildi!');
            setComment('');
            setRating(0);
            setAuthor('');
            onGoBack();
        } catch (err) {
            alert('Yorum gönderilirken hata oluştu!');
            console.error(err);
        }
    };

    return (
        <div className="comment-page-container">
            <div className="comment-page-header">
                <h2>Yorum Yap</h2>
            </div>
            <form onSubmit={handleSubmit} className="comment-form">
                <div className="rating-section">
                    <h3>Puan Ver</h3>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= rating ? 'star-filled' : 'star-empty'}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="comment-textarea-section">
                    <h3>İsminiz</h3>
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Adınız (opsiyonel)"
                    />
                    <h3>Yorumunuz</h3>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Yorumunuzu yazın..."
                        rows="6"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-comment-button">
                    Yorumu Gönder
                </button>
            </form>
            <button onClick={onGoBack} className="back-button">Geri Dön</button>
        </div>
    );
};

export default CommentPage;
