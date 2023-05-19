const GET_CART = "cart/GET_CART";
const ADD_CART = "cart/ADD_CART";
const EDIT_CART = "cart/EDIT_CART";
const DELETE_CART = "cart/DELETE_CART";

const getCart = (cart) => ({
	type: GET_CART,
	payload: cart,
});

const addCart = (cart_and_items) => ({
	type: ADD_CART,
	payload: cart_and_items,
});

const editCart = (cart) => ({
	type: EDIT_CART,
	payload: cart,
});

const deleteCart = (cart) => ({
	type: DELETE_CART,
	payload: cart,
});

const initialState = { cart: null, cartItems: null };

export const getCartThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/cart/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		console.log("GET CART THUNK DATA ~~~~~~~~>", data)
		dispatch(getCart(data));
	}
};

export const addCartThunk = (userId) => async (dispatch) => {
	const response = await fetch(`/api/cart/${userId}`, {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(addCart(data));
	}
};

export const editCartThunk = (obj) => async (dispatch) => {
	const response = await fetch(`/api/cart/${obj.id}`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj)
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(editCart(data));
	}
};

export const deleteCartThunk = (cart) => async (dispatch) => {
	const response = await fetch(`/api/cart/${cart.id}`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(cart.id)
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(deleteCart(data));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART: {
            const newState = {...state, cart: action.payload.cart, cartItems: action.payload.items}
			return newState;
        }
		case ADD_CART: {
            const newState = {...state, cart: action.payload}
			return newState;
        }
		case EDIT_CART: {
            const newState = {...state}
			newState.cart = action.payload;
			return newState;
        }
		case DELETE_CART: {
            const newState = {...state}
			newState.cart = action.payload;
			return newState;
        }
		default:
			return state;
	}
}
