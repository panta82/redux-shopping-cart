import React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

// Replace with our new reducer
//import reducer from './reducers';
import reducer from './reducer';

import {getAllProducts} from './actions/products';
import App from './containers/App';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
);

store.dispatch(getAllProducts());

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
