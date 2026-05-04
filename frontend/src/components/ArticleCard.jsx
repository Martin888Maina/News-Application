import '../styles/ArticleCard.css';

const PLACEHOLDER =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
      <rect width="400" height="200" fill="#e6e8ee"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="18" fill="#888" text-anchor="middle" dominant-baseline="middle">No image</text>
    </svg>`,
  );

function ArticleCard({ article }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : '';

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="article-card"
    >
      <img
        src={article.urlToImage || PLACEHOLDER}
        alt={article.title || ''}
        className="article-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER;
        }}
      />
      <div className="article-body">
        <span className="article-source">
          {article.source?.name || 'Unknown source'}
        </span>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-description">{article.description}</p>
        <div className="article-meta">
          <span>{article.author || 'Unknown'}</span>
          <span>{date}</span>
        </div>
      </div>
    </a>
  );
}

export default ArticleCard;
