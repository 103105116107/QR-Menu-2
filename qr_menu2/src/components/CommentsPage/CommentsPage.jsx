import React, { useEffect, useState } from 'react';
import styles from './CommentsPage.module.css';
import { FaStar, FaUserCircle, FaQuoteRight, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const CommentsPage = ({ onMakeCommentClick }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/comments/`);
                setComments(response.data);
            } catch (err) {
                console.error("Yorumlar yüklenirken hata oluştu:", err);
            }
        };

        fetchComments();
    }, []);

    return (
        <div className={styles.commentsPage}>
            <header className={styles.commentsHeader}>
                <div className={styles.testimonialHeader}>
                    <FaUserCircle className={styles.userIcon} />
                    <h1 className={styles.headerTitle}>Müşteri Yorumları</h1>
                </div>
            </header>

            <main className={styles.commentsList}>
                {comments.map((comment) => (
                    <div key={comment.id} className={styles.commentCard}>
                        <div className={styles.stars}>
                            {[...Array(comment.rating)].map((_, i) => (
                                <FaStar key={i} className={styles.starIcon} />
                            ))}
                        </div>
                        <div className={styles.quoteIcon}>
                            <FaQuoteRight />
                        </div>
                        <p className={styles.commentText}>{comment.text}</p>
                        <p className={styles.commentAuthor}>- {comment.author}</p>
                    </div>
                ))}
            </main>

            <footer className={styles.commentFooter}>
                <div className={styles.makeCommentLink} onClick={onMakeCommentClick}>
                    <span>Sen de yorum yap!</span>
                    <FaArrowRight className={styles.arrowIcon} />
                </div>
            </footer>
            <div style={{ height: '80px' }}></div>
        </div>
    );
};

export default CommentsPage;
