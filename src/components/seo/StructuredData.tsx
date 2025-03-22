import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessDataProps {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  image?: string;
}

export const LocalBusinessData: React.FC<LocalBusinessDataProps> = ({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  openingHours,
  image
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': url,
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    },
    openingHoursSpecification: openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      ...parseOpeningHours(hours)
    })),
    image: image || `${url}/images/og-image.jpg`,
    priceRange: '€€',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'EUR'
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Helper function to parse opening hours string into structured data format
function parseOpeningHours(hoursString: string) {
  // Example format: "Mo-Sa 09:00-18:00"
  const [days, hours] = hoursString.split(' ');
  const [dayStart, dayEnd] = days.includes('-') ? days.split('-') : [days, days];
  const [timeStart, timeEnd] = hours.split('-');

  return {
    dayOfWeek: expandDayRange(dayStart, dayEnd),
    opens: timeStart,
    closes: timeEnd
  };
}

// Helper function to expand day range (e.g., "Mo-Fr" to ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
function expandDayRange(start: string, end: string) {
  const dayMap: Record<string, string> = {
    'Mo': 'Monday',
    'Tu': 'Tuesday',
    'We': 'Wednesday',
    'Th': 'Thursday',
    'Fr': 'Friday',
    'Sa': 'Saturday',
    'Su': 'Sunday'
  };

  const dayOrder = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const startIndex = dayOrder.indexOf(start);
  const endIndex = dayOrder.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    return [dayMap[start] || start];
  }

  return dayOrder
    .slice(startIndex, endIndex + 1)
    .map(day => dayMap[day]);
}

interface ProductDataProps {
  name: string;
  description: string;
  image: string;
  url: string;
  brand?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: string;
  };
}

export const ProductData: React.FC<ProductDataProps> = ({
  name,
  description,
  image,
  url,
  brand = 'PergoLife',
  offers
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency || 'EUR',
        availability: offers.availability || 'https://schema.org/InStock',
        url
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default { LocalBusinessData, ProductData };
