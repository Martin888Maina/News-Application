import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ArticleList from './components/ArticleList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fetchEverything, fetchTopHeadlines } from './services/api';
import { useDebouncedValue } from './hooks/useDebouncedValue';

const PAGE_SIZE = 20;

function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [activeQuery, setActiveQuery] = useState('');

  const [filters, setFilters] = useState({
    sortBy: 'publishedAt',
    language: 'en',
    from: '',
    to: '',
  });

  // Track which fetch is the latest so out-of-order responses can't overwrite newer state
  const requestIdRef = useRef(0);

  const runSearch = useCallback(
    async (q, currentFilters, nextPage = 1, append = false) => {
      const reqId = ++requestIdRef.current;
      setLoading(true);
      setError(null);
      try {
        const data = q.trim()
          ? await fetchEverything({
              q,
              ...currentFilters,
              pageSize: PAGE_SIZE,
              page: nextPage,
            })
          : await fetchTopHeadlines({
              country: 'us',
              pageSize: PAGE_SIZE,
              page: nextPage,
            });

        if (reqId !== requestIdRef.current) return;

        const incoming = data.articles || [];
        setArticles((prev) => (append ? [...prev, ...incoming] : incoming));
        setTotalResults(data.totalResults || 0);
        setPage(nextPage);
        setActiveQuery(q);
      } catch (err) {
        if (reqId !== requestIdRef.current) return;
        setError(err.message);
        if (!append) setArticles([]);
      } finally {
        if (reqId === requestIdRef.current) setLoading(false);
      }
    },
    [],
  );

  // Initial top headlines on mount + react to debounced query / filter changes
  useEffect(() => {
    runSearch(debouncedQuery, filters, 1, false);
  }, [debouncedQuery, filters, runSearch]);

  const handleSubmit = () => {
    runSearch(query, filters, 1, false);
  };

  const handleLoadMore = () => {
    runSearch(activeQuery, filters, page + 1, true);
  };

  const hasMore = articles.length < totalResults;

  return (
    <>
      <Header />
      <main className="container">
        <SearchBar query={query} onChange={setQuery} onSubmit={handleSubmit} />
        <Filters filters={filters} onChange={setFilters} />

        {error && <ErrorMessage message={error} />}

        {!error && (
          <>
            {!loading || articles.length > 0 ? (
              <ArticleList articles={articles} query={activeQuery} />
            ) : null}

            {loading && <Loader />}

            {!loading && articles.length > 0 && hasMore && (
              <div className="load-more-wrapper">
                <button
                  type="button"
                  className="load-more-button"
                  onClick={handleLoadMore}
                >
                  Load more articles
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
