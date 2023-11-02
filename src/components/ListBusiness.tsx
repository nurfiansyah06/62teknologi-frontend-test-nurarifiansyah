import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Business {
  id: string;
  name: string;
  categories: string;
  location: string;
  latitude?: string;
  longitude?: string;
}

const ListBusiness: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Request-Headers": 'Content-Type, Authorization'
    },
  };

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null); // State to store error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + '/business', axiosConfig); // Correctly concatenate the URL
        setBusinesses(response.data);
      } catch (error) {
        setError("An error occurred while fetching data. Please try again later.");
        console.error(error); // Log the error to the console for debugging
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <div>
      <h1>List of Businesses</h1>
      {error ? (
        <div>{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Business Name</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id}>
                <td>{business.id}</td>
                <td>{business.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListBusiness;
