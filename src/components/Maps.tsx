import React, { FC, useEffect, useState } from "react";
import { Map, Marker, Point } from "pigeon-maps";
import axios from "axios";
import { useParams } from "react-router-dom";

interface AnyReactComponentProps {
  text: string;
  lat: number;
  lng: number;
}

interface Location {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const SimpleMap: FC = () => {
  const defaultProps = {
    zoom: 11
  };

  const { business_id } = useParams();
  const [detail, setDetail] = useState<any>(null);
  const [location, setLocation] = useState<Location | null >(null);

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
        setDetail(response.data);

        const coordinates = response.data.coordinates;
        if (coordinates) {
          setLocation({ coordinates });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, [business_id]);

  let defaultCenter: Point | undefined;

  if (location && location.coordinates) {
    defaultCenter = [location.coordinates.latitude, location.coordinates.longitude];
  }

  return (
    <>
      <Map
        boxClassname="map"
        height={350}
        width={500}
        defaultCenter={[50.879, 4.6997]}
        defaultZoom={11}
        center={defaultCenter}
        zoom={defaultProps.zoom}
      >
        <Marker width={50} anchor={[50.879, 4.6997]} />
      </Map>
    </>
  );
}

export default SimpleMap;
