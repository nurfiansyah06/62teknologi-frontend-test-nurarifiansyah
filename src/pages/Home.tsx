import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import axios from 'axios';
import CardComponent from '../components/Card';
import Search from '../components/InputSearch';
import Categories from '../components/Categories';

interface Category {
  alias: string;
  title: string;
}

interface Location {
  address1: string;
  address2: string;
  address3: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  zip_code: string;
  country: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Business {
  id: string;
  name: string;
  categories: Category[]; 
  location: Location;
  latitude?: string;
  longitude?: string;
  image_url: string;
  coordinates?: Coordinates;
}

const Home: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    axios
      .get('https://api.yelp.com/v3/businesses/search?location=roma', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Content-Type, Authorization',
          Authorization: `Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx`,
        },
      })
      .then((response) => {
        setBusinesses(response.data.businesses);
        setTotalPages(response.data.total_pages);
        console.log(response.data.businesses.categories);
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred while fetching data. Please try again later.');
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [businessPerPage] = useState(5);

  const indexOfLastBusiness = currentPage * businessPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessPerPage;
  const currentBusinesses = businesses.slice(
    indexOfFirstBusiness, indexOfLastBusiness
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Business List</h1>
        <Search onSearch={handleSearch} /> <br />
        {error && <p>{error}</p>}
        <div className="row">
          
          {currentBusinesses.filter(business => business.name.toLowerCase().includes(search.toLowerCase())).map((business) => (
            
            <div key={business.id} className="col-md-4">
              <CardComponent
                name={business.name}
                categories={business.categories.map((category) => category.title)}
                address={`${business.location.address1}, ${business.location.address2}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`}
                imageUrl={business.image_url}
                latitude={business.coordinates?.latitude}
                longitude={business.coordinates?.longitude}
                id={business.id}                
                />
                
            </div>
          ))}
        </div>
        <Pagination businessesPerPage={businessPerPage} totalBusiness={businesses.length} paginate={paginate}/>
      </div>
    </div>
  );
};

export default Home;
