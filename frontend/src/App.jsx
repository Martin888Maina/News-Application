import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import ArticleList from './components/ArticleList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const SAMPLE_ARTICLES = [
  {
    source: { name: 'Wired' },
    author: 'Adrienne So',
    title: 'How to Track Your Luggage on Every Trip',
    description:
      'A small Bluetooth tracker can save you a vacation when an airline misplaces your bag.',
    url: 'https://www.wired.com/story/how-to-track-your-luggage/',
    urlToImage:
      'https://images.unsplash.com/photo-1565620731358-ed4c5c0a3a89?w=600',
    publishedAt: '2026-05-03T11:00:00Z',
  },
  {
    source: { name: 'TechCrunch' },
    author: 'Sarah Perez',
    title: 'The state of climate tech in 2026',
    description:
      'Funding for climate-focused startups continues to grow despite a tougher venture market.',
    url: 'https://techcrunch.com/climate-tech-2026',
    urlToImage:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600',
    publishedAt: '2026-05-02T14:30:00Z',
  },
  {
    source: { name: 'The Verge' },
    author: 'James Vincent',
    title: 'Apple announces new accessibility features for iOS 19',
    description:
      'New AI-powered features will help users with motor and vision impairments navigate iPhone.',
    url: 'https://www.theverge.com/apple-ios-19-accessibility',
    urlToImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
    publishedAt: '2026-05-01T09:15:00Z',
  },
];

function App() {
  const [articles] = useState(SAMPLE_ARTICLES);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'publishedAt',
    language: 'en',
    from: '',
    to: '',
  });

  const handleSearch = (query) => {
    console.log('Search submitted:', query, filters);
  };

  return (
    <>
      <Header />
      <main className="container">
        <SearchBar onSearch={handleSearch} />
        <Filters filters={filters} onChange={setFilters} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <ArticleList articles={articles} />}
      </main>
    </>
  );
}

export default App;
