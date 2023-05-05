import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, SearchBar } from '../components'

const ProductsContainer = React.forwardRef((props, ref) => {
  return (
    <div className="products-container" ref={ref}>
      {props.products?.map(product => <Product key={product._id} product={product} />)}
    </div>
  );
});

const Home = ({ products, bannerData, hasFilter }) => {
  const containerRef = React.createRef();

  // React.useEffect(() => {
  //   console.log(hasFilter);

  //   if (hasFilter) {
  //     let element = containerRef.current;
  //     if (element) {
  //       let { top } = element.getBoundingClientRect(); 
  
  //       window.scrollTo({
  //         top: top - 180 - window.scrollY,
  //         behavior: "smooth"
  //       })
  //     }
  //   }
  // }, []);

  return (
    <div>
      {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> */}
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>

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
    props: { products, bannerData, hasFilter: filter !== undefined }
  }
}

export default Home;
