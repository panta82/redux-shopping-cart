import {createStore} from 'redux';
import reducer from '../reducer';

import {_gotAllProducts} from './products';

describe('actions', () => {
	describe('products', () => {
		it('should correctly handle getting all products', () => {
			const store = createStore(reducer);
			const products = [{id: 1}, {id: 2}];

			_gotAllProducts(store.dispatch)(products);

			/** @type State */
			const state = store.getState();

			expect(state.products.byId['1'].id).toEqual(1);
			expect(state.products.byId['2'].id).toEqual(2);
			expect(state.products.visibleIds).toEqual([1, 2]);
		});
	});
});