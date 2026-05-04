import ArticleCard from './ArticleCard';
import '../styles/ArticleList.css';

function ArticleList({ articles, query, onSelect }) {
  if (!articles.length) {
    return (
      <p className="no-articles">
        {query
          ? `No articles found for "${query}". Try a different search.`
          : 'No articles to show.'}
      </p>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article, idx) => (
        <ArticleCard
          key={`${article.url}-${idx}`}
          article={article}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ArticleList;
