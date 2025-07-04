import React from 'react';
import styles from './CommentsPage.module.css';

import { FaStar, FaUserCircle, FaQuoteRight, FaArrowRight } from 'react-icons/fa';

const CommentsPage = ({ onMakeCommentClick }) => { // onMakeCommentClick prop'unu alıyoruz
    const comments = [
        {
            id: 1,
            author: 'Olivia Wilson',
            rating: 5,
            text: 'The course is an affordable, self-paced course that teaches you everything you need to know to become a successful web designer. The staff is always friendly and the food is delicious. Highly recommend!'
        },
        {
            id: 2,
            author: 'Ahmet Yılmaz',
            rating: 4,
            text: 'Harika bir deneyim! Yemekler çok lezzetliydi, özellikle tatlılar. Servis de hızlı ve güler yüzlüydü. Tekrar gelmeyi düşünüyorum.'
        },
        {
            id: 3,
            author: 'Ayşe Demir',
            rating: 5,
            text: 'Mekan çok şık, atmosfer harika. Kahveleri ve tatlıları çok başarılı. Çalışanlar çok ilgili ve nazik. Mutlaka denemelisiniz!'
        },
        {
            id: 4,
            author: 'Mehmet Can',
            rating: 3,
            text: 'Yemekler fena değildi ama daha iyi olabilirdi. Fiyatlar biraz yüksek geldi. Genel olarak ortalama bir deneyim. Umarım geliştirirler.'
        },
        {
            id: 5,
            author: 'Zeynep Kaya',
            rating: 5,
            text: 'Bayıldım! Servis kalitesi, lezzetler ve mekanın temizliği tek kelimeyle mükemmeldi. Arkadaşlarıma tavsiye edeceğim.'
        }
    ];

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
                {/* onClick olayını onMakeCommentClick prop'una bağlıyoruz */}
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