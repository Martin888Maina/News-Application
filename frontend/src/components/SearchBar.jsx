import '../styles/SearchBar.css';

function SearchBar({ query, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="search-input"
        placeholder="Search news (e.g. tesla, apple, climate)..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search news articles"
        autoComplete="off"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
