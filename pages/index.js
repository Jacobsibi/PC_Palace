import React from 'react';
import { client } from '../lib/client';
import { Product, Banner } from '../components'
import { useDepartmentsContext } from '@/context/DepartmentsContext';

const ProductsContainer = React.forwardRef((props, ref) => {
	const { departmentsFilter } = useDepartmentsContext();
	const products = props.products?.filter(item => (departmentsFilter === "" ? true : item.component === departmentsFilter));

	return (
		<div className="products-container" ref={ref}>
			{products?.map(product => <Product key={product._id} product={product} />)}
		</div>
	);
});

const Home = ({ products, bannerData }) => {
	const containerRef = React.createRef();

	return (
		<div>
			<Banner banner={bannerData && bannerData[0]} />

			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p>PC Components of many variations</p>
			</div>

			<ProductsContainer products={products} ref={containerRef} />

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
