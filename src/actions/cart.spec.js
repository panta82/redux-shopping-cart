import {createStore} from 'redux';
import reducer from '../reducer';

import {addToCart} from './cart';
import {_gotAllProducts} from './products';

describe('actions', () => {
	describe('cart', () => {
		describe('addToCart', () => {
			it('should correctly add product to cart', () => {
				const store = createStore(reducer);
				const products = [{
					id: 1,
					inventory: 2
				}];
				_gotAllProducts(store.dispatch)(products);

				addToCart(1)(store.dispatch, store.getState);

				/** @type State */
				let state = store.getState();

				expect(state.products.byId['1'].id).toEqual(1);
				expect(state.products.byId['1'].inventory).toEqual(1);
				expect(state.cart.quantityById['1']).toEqual(1);
				expect(state.cart.addedIds).toEqual([1]);

				addToCart(1)(store.dispatch, store.getState);

				state = store.getState();
				expect(state.products.byId['1'].inventory).toEqual(0);
				expect(state.cart.quantityById['1']).toEqual(2);
				expect(state.cart.addedIds).toEqual([1]);
			});

			it('should not add product to cart if there is not enough inventory', () => {
				const store = createStore(reducer);
				const products = [{
					id: 1,
					inventory: 0
				}];
				_gotAllProducts(store.dispatch)(products);

				addToCart(1)(store.dispatch, store.getState);

				/** @type State */
				let state = store.getState();

				expect(state.products.byId['1'].id).toEqual(1);
				expect(state.products.byId['1'].inventory).toEqual(0);
				expect(state.cart.quantityById['1']).toBeUndefined();
				expect(state.cart.addedIds).toEqual([]);
			});
		});
	});
});