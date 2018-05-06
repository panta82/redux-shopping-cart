import l_isArray from 'lodash/isArray';
import l_isString from 'lodash/isString';
import l_isObjectLike from 'lodash/isObjectLike';

/**
 * Generate payload for store. Payload should be an object matching structure of the store.
 * The terminators of payload should be wrapped in PayloadValue, so that we can extract them and form the result payload
 * @example
 *     commit("Update cart", 'cart.items', [])
 *     commit("Reset entire store", {
 *         "cart.items": [],
 *         "products": {}
 *     })
 */
export function commit(message, payload) {
	const result = {
		type: message,
	};

	walk(payload);

	return result;

	function walk(ob, pathPrefix = '') {
		if (!ob) {
			return;
		}
		for (let key in ob) {
			if (!ob.hasOwnProperty(key)) {
				continue;
			}

			const val = ob[key];
			if (val instanceof PayloadValue) {
				// This is where we stop
				result[pathPrefix + key] = val.value;
			}
			else if (l_isObjectLike(val)) {
				// Dig in
				walk(val, pathPrefix + key + '.');
			}
			else {
				// The user gave us a leaf without wrapping it in set(). Treat it as bug for now
				throw new Error(`Trying to set ${pathPrefix + key} without wrapping it into set() `
					+ `(${message} -> ${JSON.stringify(payload, null, '  ')})`);
			}
		}
	}
}

class PayloadValue {
	constructor(value) {
		this.value = value;
	}
}

export function set(value) {
	return new PayloadValue(value);
}