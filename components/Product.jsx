import React, {useEffect} from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {

  useEffect(() => {
    // This logs the value of `slug` as it changes
    console.log('value of slug:', slug);
  }, [slug]);

  // This means that nothing is rendered if `slug` is undefined
  if (!slug) return null;

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product