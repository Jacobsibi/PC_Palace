import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components'

const ProductsContainer = React.forwardRef((props, ref) => {
  return (
    <div id="products-container" ref={ref}>
      {props.products?.map(product => <Product key={product._id} product={product} />)}
    </div>
  );
});

const Home = ({ products, bannerData, hasFilter }) => {
  const [ hasScrolled, setHasScrolled ] = React.useState(false);
  const containerRef = React.createRef();
  console.log(hasFilter);
  
  if (hasFilter && !hasScrolled) {
    let element = containerRef.current;
    if (element) {
      let { top } = element.getBoundingClientRect();

      window.scrollTo({
        top: top,
        behavior: "smooth"
      })

      setHasScrolled(true);
    }
  }

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>PC Components of many variations</p>
      </div>

      <ProductsContainer products={products} ref={containerRef} />


      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  );
}

export const getServerSideProps = async context => {
  let filter = context.query.filter;

  let query = "";
  if (!filter) {
    query = '*[_type == "product"]';
  } else {
    query = `*[_type == "product" && component match "${filter}"]`;
  }

  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, hasFilter: filter !== null }
  }
}

export default Home;
