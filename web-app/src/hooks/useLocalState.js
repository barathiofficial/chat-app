import React from 'react'

/**
 * A custom React hook that returns a stateful value and a function to update it.
 * The state is stored in the browser's local storage and persists across page reloads.
 * @param {string} key - The key to use when storing the state in local storage.
 * @param {any} defaultValue - The default value to use if no value is found in local storage.
 * @returns {[any, Function]} - A tuple containing the current state value and a function to update it.
 */
const useLocalState = (key, defaultValue) => {
	const [state, setState] = React.useState(() => {
		const localValue = localStorage.getItem(key)
		return localValue ? JSON.parse(localValue) : defaultValue
	})

	React.useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [key, state])

	return [state, setState]
}

export default useLocalState
