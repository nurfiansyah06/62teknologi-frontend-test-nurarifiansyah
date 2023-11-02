import React from 'react';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  id: string;
  name: string;
  categories: string[];
  address: string;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  id,
  name,
  categories,
  address,
  latitude,
  longitude,
  imageUrl,
}) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Categories: {categories.join(', ')}</p>
        <p className="card-text card-address">Address: {address}</p>
        <p className="card-text">Latitude: {latitude}</p>
        <p className="card-text">Longitude: {longitude}</p>
        <p>
          <Link to={`/detail/${id}`} className="btn btn-primary">Detail Business</Link>
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;
