'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';

export default function LocationMap({
  area,
  city,
  address,
  directions,
}: {
  area: string;
  city: string;
  address: string;
  directions: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="location-map">
      {loaded ? (
        <iframe
          title={`Map of ${area}, ${city}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <svg
            className="location-map-art"
            viewBox="0 0 600 460"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="600" height="460" fill="#132330" />
            <path
              d="M-30 70 120 0l150 130 160-60 200 80M-20 300l200-110 160 40 130-30 170 170M20 490l140-120 190-10 200 150M90-50l45 230-40 140 80 200M350-50l-80 160 35 140-25 220M510-30l-35 180 90 110-60 230"
              stroke="#2c4252"
              strokeWidth="30"
            />
            <path
              d="M-30 70 120 0l150 130 160-60 200 80M-20 300l200-110 160 40 130-30 170 170M20 490l140-120 190-10 200 150M90-50l45 230-40 140 80 200M350-50l-80 160 35 140-25 220M510-30l-35 180 90 110-60 230"
              stroke="#40596a"
              strokeWidth="2"
            />
            <path
              d="M420 240c-90 60-130 0-100 130s190 100 200 5-10-195-100-135ZM30 10c40 0 80 80 20 120S-60 85-20 30Z"
              fill="#1e3c39"
            />
            <circle
              cx="300"
              cy="210"
              r="83"
              fill="#53b8fb0c"
              stroke="#69c0ff25"
            />
            <circle
              cx="300"
              cy="210"
              r="54"
              fill="#53b8fb0c"
              stroke="#69c0ff35"
            />
          </svg>
          <div className="location-map-center">
            <span className="location-pin">
              <Icon name="pin" size={30} />
            </span>
            <strong>{area}</strong>
            <span>{city}</span>
            <button onClick={() => setLoaded(true)}>
              Show interactive map <Icon name="plus" size={16} />
            </button>
          </div>
        </>
      )}
      <div className="location-map-caption">
        <span>
          <Icon name="pin" size={15} /> {area} · {city}
        </span>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the business location in Google Maps"
        >
          <Icon name="arrow-up-right" size={18} />
        </a>
      </div>
    </div>
  );
}
