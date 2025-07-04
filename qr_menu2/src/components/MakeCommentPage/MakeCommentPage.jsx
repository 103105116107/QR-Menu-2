import React, { useState } from 'react';
import './MakeCommentPage.css'; 
const CommentPage = ({ onGoBack }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Comment submitted:', comment);
        console.log('Rating:', rating);
        alert('Yorumunuz gönderildi! (Your comment has been submitted!)');
        setComment('');
        setRating(0);
        onGoBack(); 
    };

    return (
        <div className="comment-page-container">
            <div className="comment-page-header">
                <h2>Yorum Yap (Make a Comment)</h2>
            </div>
            <form onSubmit={handleSubmit} className="comment-form">
                <div className="rating-section">
                    <h3>Puan Ver (Rate Us)</h3>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= rating ? 'star-filled' : 'star-empty'}
                                onClick={() => setRating(star)}
                            >
                                &#9733; {}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="comment-textarea-section">
                    <h3>Yorumunuz (Your Comment)</h3>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Yorumunuzu buraya yazın..."
                        rows="6"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="submit-comment-button">
                    Yorumu Gönder (Submit Comment)
                </button>
            </form>
            <button onClick={onGoBack} className="back-button">Geri Dön</button>
        </div>
    );
};

export default CommentPage;
