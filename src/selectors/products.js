export const getVisibleProducts = /** State */ state =>
	state.products.visibleIds.map(id => state.products.byId[id]).filter(Boolean);