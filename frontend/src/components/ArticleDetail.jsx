import { useEffect, useRef } from 'react';
import '../styles/ArticleDetail.css';

const PLACEHOLDER =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 260">
      <rect width="640" height="260" fill="#e6e8ee"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="18" fill="#888" text-anchor="middle" dominant-baseline="middle">No image</text>
    </svg>`,
  );

function ArticleDetail({ article, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const content = article.content
    ? article.content.replace(/\s*\[\+\d+ chars\]$/, '')
    : '';

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="detail-backdrop" onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={article.title}>
      <div className="detail-card">
        <button
          ref={closeRef}
          className="detail-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <img
          src={article.urlToImage || PLACEHOLDER}
          alt={article.title || ''}
          className="detail-image"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER;
          }}
        />

        <div className="detail-body">
          <span className="detail-source">
            {article.source?.name || 'Unknown source'}
          </span>

          <h2 className="detail-title">{article.title}</h2>

          <div className="detail-meta">
            {article.author && <span>{article.author}</span>}
            {date && <span>{date}</span>}
          </div>

          {article.description && (
            <p className="detail-description">{article.description}</p>
          )}

          {content && (
            <p className="detail-content">{content}</p>
          )}

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-read-more"
          >
            Read full article →
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
