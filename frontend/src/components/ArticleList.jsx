import ArticleCard from './ArticleCard';
import '../styles/ArticleList.css';

function ArticleList({ articles }) {
  if (!articles.length) {
    return (
      <p className="no-articles">No articles found. Try searching above.</p>
    );
  }

  return (
    <div className="article-grid">
      {articles.map((article, idx) => (
        <ArticleCard key={`${article.url}-${idx}`} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;
