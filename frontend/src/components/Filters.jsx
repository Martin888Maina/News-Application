import '../styles/Filters.css';

function Filters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="filter-sort">Sort By</label>
        <select
          id="filter-sort"
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="publishedAt">Newest</option>
          <option value="popularity">Popularity</option>
          <option value="relevancy">Relevancy</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-language">Language</label>
        <select
          id="filter-language"
          value={filters.language}
          onChange={(e) => handleChange('language', e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="filter-from">From</label>
        <input
          id="filter-from"
          type="date"
          value={filters.from}
          onChange={(e) => handleChange('from', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="filter-to">To</label>
        <input
          id="filter-to"
          type="date"
          value={filters.to}
          onChange={(e) => handleChange('to', e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
