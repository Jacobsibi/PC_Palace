import React from 'react';
import Link from 'next/link';
import { urlFor } from '@/lib/client';

const HeroBanner = ({heroBanner}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="pc-banner">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="computer" className="hero-banner-image" />

        <div>
          <Link href={`/products/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>INSERT ---Description</h5>
            <p>{heroBanner.desc}</p>
          </div>

        </div>
      </div>
    </div>


  )
}

export default HeroBanner