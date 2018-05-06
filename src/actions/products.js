import shop from '../api/shop';
import {commit, set} from './common';

export const INITIAL_STATE = /** @lends State.prototype */ {
	/**
	 * Master store of products
	 */
	products: {
		/**
		 * Mapping of product id -> product, source of truth for products
		 */
		byId: {},

		/**
		 * Products to display in interface, in the given order
		 */
		visibleIds: [],
	}
};

export const _gotAllProducts = dispatch => products => {
	const byId = {};
	const visibleIds = [];
	products.forEach(product => {
		byId[product.id] = product;
		visibleIds.push(product.id);
	});

	dispatch(commit(`Got all products`, {
		products: set({
			byId,
			visibleIds
		})
	}));
};

export const getAllProducts = () => dispatch => {
	return shop.getProducts(_gotAllProducts(dispatch));
};