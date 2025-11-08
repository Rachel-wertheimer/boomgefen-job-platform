import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, url }) => {
  const keywordsString = keywords.join(', ');
  
  // Hidden keywords container styles - visible to search engines but not to users
  // Using position: absolute with left: -9999px (not display: none) ensures Google can crawl the content
  const hiddenKeywordsStyle: React.CSSProperties = {
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywordsString} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {url && <meta property="og:url" content={url} />}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        
        {/* Language */}
        <html lang="he" dir="rtl" />
      </Helmet>
      
      {/* Hidden keywords for SEO - not visible to users but crawlable by Google */}
      <div style={hiddenKeywordsStyle} aria-hidden="true">
        {keywords.map((keyword, index) => (
          <span key={index}>{keyword} </span>
        ))}
      </div>
    </>
  );
};

