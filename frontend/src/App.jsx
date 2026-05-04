import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ArticleList from './components/ArticleList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fetchEverything } from './services/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'publishedAt',
    language: 'en',
    from: '',
    to: '',
  });

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await fetchEverything({ q: query, ...filters });
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <SearchBar onSearch={handleSearch} />
        <Filters filters={filters} onChange={setFilters} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && hasSearched && (
          <ArticleList articles={articles} />
        )}
      </main>
    </>
  );
}

export default App;
