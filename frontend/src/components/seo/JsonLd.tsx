import React from 'react';

export interface ProductJsonLdProps {
  name: string;
  description: string;
  brand: string;
  category: string;
  minPrice?: number;
  rating?: number;
  url: string;
}

export function ProductJsonLd({ name, description, brand, category, minPrice, rating = 4.8, url }: ProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    category,
    offers: {
      '@type': 'Offer',
      price: minPrice || 0,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
      url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: 128,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
