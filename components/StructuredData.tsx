import Script from 'next/script';
import { Product } from '@/types';

interface StructuredDataProps {
  product?: Product;
  type?: 'website' | 'product' | 'organization';
}

export default function StructuredData({ product, type = 'website' }: StructuredDataProps) {
  if (type === 'product' && product) {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      offers: {
        '@type': 'Offer',
        url: `https://shophub.com/product/${product.id}`,
        priceCurrency: 'INR',
        price: product.price,
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'ShopHub',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviews,
      },
    };

    return (
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }

  if (type === 'website') {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ShopHub',
      url: 'https://shophub.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://shophub.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };

    return (
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }

  return null;
}

