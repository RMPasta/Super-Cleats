const GET_ITEMS = "items/GET_ITEMS";

const getItems = (items) => ({
	type: GET_ITEMS,
	payload: items,
});

const initialState = { items: null };

export const getItemsThunk = () => async (dispatch) => {
	const response = await fetch("/api/items/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getItems(data.items));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
            const newState = {...state, items: action.payload}
			return newState;
		default:
			return state;
	}
}
