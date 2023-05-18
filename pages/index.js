import React from 'react';
import { client } from '../lib/client';
import { Product, Banner } from '../components'
import { DepartmentsContextProvider, useDepartmentsContext } from '@/context/DepartmentsContext';

const ProductsContainer = React.forwardRef((props, ref) => {
	const { departmentsFilter } = useDepartmentsContext();

	let products = props.products?.filter(item => (item.component === departmentsFilter));

	console.log(products);

	return (
		<div className="products-container" ref={ref}>
			{props.products?.map(product => <Product key={product._id} product={product} />)}
		</div>
	);
});

const Home = ({ products, bannerData }) => {
	const containerRef = React.createRef();

	return (
		<div>
			{/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> */}
			<Banner banner={bannerData && bannerData[0]} />

			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>PC Components of many variations</p>
			</div>

			<DepartmentsContextProvider>
				<ProductsContainer products={products} ref={containerRef} />
			</DepartmentsContextProvider>

			<Banner banner={bannerData && bannerData[0]} />
		</div>
	);
}

export const getServerSideProps = async () => {
	let query = '*[_type == "product"]';

	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData }
	}
}

export default Home;
