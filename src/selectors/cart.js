export const getTotal = /** State */ state => {
	return state.cart.addedIds
		.reduce((total, id) => {
			return total + state.products.byId[id].price * (state.cart.quantityById[id] || 0);
		}, 0)
		.toFixed(2);
};

export const getCartProducts = /** State */ state =>
	state.cart.addedIds.map(id => ({
		...state.products.byId[id],
		quantity: state.cart.quantityById[id]
	}));