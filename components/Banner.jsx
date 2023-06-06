import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Banner = ({ banner: { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
	return (
		<div className="footer-banner-container">
			<div className="banner-desc">
				<div className="left">
					<h3>{largeText1}</h3>
					<h3>{largeText2}</h3>

				</div>
				<div className="right">
					<p>{discount} {smallText}</p>
					<h3>{midText}</h3>
					<p>{desc}</p> <br />
					<p>{saleTime}</p>
					{/* <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link> */}

				</div>

				<img
					src={urlFor(image)} className="footer-banner-image"
				/>
			</div>
		</div>
	)
}

export default Banner