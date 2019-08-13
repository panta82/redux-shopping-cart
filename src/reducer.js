import l_isArray from 'lodash/isArray';
import l_isPlainObject from 'lodash/isPlainObject';

import {INITIAL_STATE as CART_STATE} from './actions/cart';
import {INITIAL_STATE as PRODUCTS_STATE} from './actions/products';

/**
 * Combined state
 * The content is provided by @lends jsdoc annotations
 */
export class State {}

export default function reducer(state, action) {
	if (state === undefined) {
		// Setup the initial state
		state = {
			...CART_STATE,
			...PRODUCTS_STATE
		};
	} else {
		// Shallow copy previous state
		state = {...state};
	}

	for (let key in action) {
		if (key !== 'type' && action.hasOwnProperty(key)) {
			let path = key.split('.');
			deepSet(state, path, action[key]);
		}
	}

	// Deeply mutated state at this point, where all the nested objects should be recreated
	return state;
}

/**
 * Deeply sets value at path. Path should be an array of keys.
 * The algorithm will shallow-copy all objects and arrays on the way down the "path".
 * @example
 *     deepSet({a: {b: {c: 1}}}, ['a', 'b', 'c'], 2)
 * This will change 1 to 2, but will also shallow copy all the objects on the way there.
 * 	   deepSet()
 */
export function deepSet(target, path, value, pathIndex = 0) {
	const key = path[pathIndex];
	if (pathIndex >= path.length - 1) {
		// There is no more path to follow. Set the value here
		target[key] = value;
		return;
	}

	// Continue going down the line
	if (l_isArray(target[key])) {
		target[key] = [...target[key]];
	}
	else if (l_isPlainObject(target[key])) {
		target[key] = {...target[key]};
	}
	else {
		// So the target is like a null or a class instance or something. We can't clone it.
		// We will treat this as bug and throw an error
		throw new Error(`Trying to write to ${path.join('.')}, but target doesn't have `
			+ `a suitable receptor at ${key} (found: ${target})`);
	}

	return deepSet(target[key], path, value, pathIndex + 1);
}