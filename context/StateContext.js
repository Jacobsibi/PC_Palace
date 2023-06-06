import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [showCart, setShowCart] = useState(false);

	const addBuild = build => {
		// Create copy of the cart
		let newCart = JSON.parse(JSON.stringify(cartItems));
		let quantity = totalQuantities;
		let price = totalPrice;

		Object.values(build).forEach(product => {
			// Extract the existing IDs from the cart
			const existingIds = newCart.map(x => x._id);
			// Get the ID of the productID (positive if found, -1 if not found)
			const index = existingIds.indexOf(product._id);

			if (index >= 0) {
				// Update quantity
				newCart[index].quantity++;
			} else {
				// Add item with quantity 1
				product.quantity = 1;
				newCart.push(product);
			}

			toast.success(`1 ${product.name} added to cart!`);
			quantity++;
			price += product.price;
		});

		setCartItems(newCart);
		setTotalQuantities(quantity);
		setTotalPrice(price);
	}

	const onAdd = (product, quantity) => {
		//check if product is already in the cart
		const checkProductInCart = cartItems.find((item) => item._id === product._id);

		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
		if (checkProductInCart) {
			//recognise if item is already in the cart and simply add quantity instead of duplicating same item
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id) return {
					...cartProduct,
					quantity: cartProduct.quantity + quantity
				}
			})

			setCartItems(updatedCartItems);
			//else if item does not already exist in cart
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to cart!`);
	}

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
		setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
		setCartItems(newCartItems);
	}

	const toggleCartItemQuantity = (id, value) => {
		const updatedCartItems = cartItems.map((item) => {
			if (item._id === id) {
				const updatedItem = { ...item };
				updatedItem.quantity += value === 'inc' ? 1 : -1;
				if (updatedItem.quantity < 1) {
					updatedItem.quantity = 1;
				}
				return updatedItem;

			}
			return item;
		});

		setCartItems(updatedCartItems);

		const foundProduct = cartItems.find((item) => item._id === id);
		const itemPrice = foundProduct.price;
		const itemQuantity = foundProduct.quantity + (value === 'inc' ? 1 : -1);
		if (itemQuantity < 1) {
			return;
		}
		setTotalPrice((prevTotalPrice) => {
			let newPrice = prevTotalPrice + (value === 'inc' ? itemPrice : -itemPrice);
			if (newPrice < 0) {
				newPrice = 0;
			}
			return newPrice;
		});
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + (value === 'inc' ? 1 : -1));
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	}
	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1
		});
	}



	return (
		<Context.Provider
		value={{
			showCart,
			setShowCart,
			cartItems,
			totalPrice,
			totalQuantities,
			qty,
			incQty,
			decQty,
			onAdd,
			toggleCartItemQuantity,
			onRemove,
			setCartItems,
			setTotalPrice,
			setTotalQuantities
		  }}
		>
			{children}
		</Context.Provider>
	)
}

export const useStateContext = () => useContext(Context);