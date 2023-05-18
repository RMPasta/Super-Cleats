const GET_ITEMS = "items/GET_ITEMS";
const ADD_ITEM = "items/ADD_ITEM";
const EDIT_ITEM = "items/EDIT_ITEM";
const DELETE_ITEM = "items/DELETE_ITEM";

const getItems = (items) => ({
	type: GET_ITEMS,
	payload: items,
});


const addItem = (item) => ({
	type: ADD_ITEM,
	payload: item,
});

const editItem = (item) => ({
	type: EDIT_ITEM,
	payload: item,
});

const deleteItem = (item) => ({
	type: DELETE_ITEM,
	payload: item,
});


const initialState = { items: null, userItems: null };

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

export const addItemThunk = (item) => async (dispatch) => {
	const response = await fetch("/api/items/", {
		method: "POST",
		body: item
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(addItem(data.item));
	}
};

export const editItemThunk = (item, itemId) => async (dispatch) => {
	const response = await fetch(`/api/items/${itemId}`, {
		method: "PUT",
		body: item
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(editItem(data));
	}
};

export const deleteItemThunk = (itemId) => async (dispatch) => {
	const response = await fetch(`/api/items/${itemId}`, {
		method: "DELETE",
		body: JSON.stringify()
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(deleteItem(itemId));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS: {
            const newState = {...state, items: action.payload}
			return newState;
		}
		case ADD_ITEM: {
            const newState = {...state}
			newState.items.push(action.payload)
			return newState;
		}
		case EDIT_ITEM: {
            const newState = {...state}
			newState.items[action.payload.id] = action.payload
			return newState;
		}
		case DELETE_ITEM: {
            const newState = {...state}
			delete newState.items[action.payload]
			return newState;
		}
		default:
			return state;
	}
}
