import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import SlideshowImage from '../components/SlideshowImage';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import SimpleMap from "../components/Maps"
import ReviewList from '../components/ReviewList';

interface DetailBusinessProps {
    id: string;
    name: string;
    categories: string[];
    address: string;
    photos: string[];
    rating: number;
}

const Detail: React.FC = () => {
    const { business_id } = useParams();
    const [business, setBusiness] = useState<DetailBusinessProps | null>(null);
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    }

    useEffect(() => {
        axios
            .get(`https://api.yelp.com/v3/businesses/${business_id}?`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type, Authorization',
                    Authorization: `Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx`,
                },
            })
            .then((response) => {
                setBusiness(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [business_id]);

    return (
        <>
            <Navbar />
            <div className="container">
                {business && business.photos.length > 0 && (
                    <SlideshowImage photos={business.photos} />
                    )}
                <h1>{business?.name}</h1>
                <p>{business?.address}</p>

                    <ReviewList review={undefined} />

                <Rating rating={business?.rating} />
                <SimpleMap />
            </div>
        </>
    );
}

export default Detail;
