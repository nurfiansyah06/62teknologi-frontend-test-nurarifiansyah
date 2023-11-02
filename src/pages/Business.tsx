import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import CardComponent from '../components/Card';
import Search from '../components/InputSearch';

interface SearchResultProps {
  id: number;
  location: string;
  name: string;
  // Add more properties as needed based on your API response
}

const Business: React.FC = () => {
  const [search, setSearch] = useState({ name: '', location: '' });
  const [results, setResults] = useState<SearchResultProps[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchBusinesses = async (name: string, location: string) => {
    const queryParams = [];
    if (location) {
      queryParams.push(`location=${location}`);
    }
    if (name) {
      queryParams.push(`name=${name}`);
    }

    const queryString = queryParams.join('&');
    const getSearch = apiUrl + `/business/search?${queryString}`;

    try {
      const response = await axios.get(getSearch);
      if (Array.isArray(response.data.business)) {
        return response.data.business;
      } else {
        console.error('API response does not contain a business array:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const businessData = await fetchBusinesses(search.name, search.location);
      setResults(businessData);
    };

    if (search.name || search.location) {
      fetchData();
    }
  }, [search]);

  const handleSearch = () => {
    setResults([]);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Search App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by location..."
            value={search.location}
            onChange={(e) => setSearch({ ...search, location: e.target.value })}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="row">
          {results.map((result) => (
            <div className="col-sm-4" key={result.id}>
              <CardComponent name={result.location} address={result.name} categories={[]} imageUrl={''} id={''}  />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Business;
