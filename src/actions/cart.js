import {commit, set} from './common';
import shop from '../api/shop';

export const INITIAL_STATE = /** @lends State.prototype */ {
	/**
	 * Current cart
	 */
	cart: {
		/**
		 * List of added product ids
		 */
		addedIds: [],

		/**
		 * Mapping of product id -> quantity, for products currently in the cart
		 */
		quantityById: {}
	}
};

export const addToCart = (productId) => (dispatch, getState) => {
	const state = getState();
	const product = state.products.byId[productId];

	if (!product || product.inventory <= 0) {
		return;
	}
	const existingQuantity = state.cart.quantityById[productId] || 0;
	const addedIds = state.cart.addedIds;

	dispatch(commit('Add product to cart', {
		products: {
			byId: {
				[productId]: set({
					...product,
					inventory: product.inventory - 1
				})
			}
		},
		cart: {
			addedIds: set(existingQuantity
				? addedIds
				: [...addedIds, productId]),
			quantityById: {
				[productId]: set(existingQuantity + 1)
			}
		}
	}));
};

export const checkout = products => (dispatch, getState) => {
	//const cart = getState().cart;

	dispatch(commit(`Checkout request, clean cart`, {
		cart: set({
			...INITIAL_STATE.cart
		})
	}));

	// TODO: Shouldn't products come from cart?

	shop.buyProducts(products, () => {
		// TODO Restore cart in case of failure
	});
};