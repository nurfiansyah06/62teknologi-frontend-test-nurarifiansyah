import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setError('Search field cannot be empty.');
    } else {
      setError(''); // Clear the error message if the search input is not empty.
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setError(e.target.value.trim() === '' ? 'Search field cannot be empty.' : '');
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Search;
