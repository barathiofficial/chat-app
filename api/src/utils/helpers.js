/**
 * Returns a new object with the specified keys omitted.
 *
 * @param {Object} obj - The object to omit keys from.
 * @param {string[]} keys - The keys to omit.
 * @returns {Object} - A new object with the specified keys omitted.
 */
const omit = (obj, keys) => {
	const newObj = {}
	Object.keys(obj).forEach((key) => {
		if (!keys.includes(key)) {
			newObj[key] = obj[key]
		}
	})
	return newObj
}

/**
 * Creates a new object with only the specified keys from the original object.
 *
 * @param {Object} obj - The original object.
 * @param {string[]} keys - The keys to pick from the original object.
 * @returns {Object} A new object with only the specified keys from the original object.
 */
const pick = (obj, keys) => {
	const newObj = {}
	Object.keys(obj).forEach((key) => {
		if (keys.includes(key)) {
			newObj[key] = obj[key]
		}
	})
	return newObj
}

module.exports = {
	omit,
	pick
}
