const GET_CART = "cart/GET_CART";
const ADD_CART = "cart/ADD_CART";

const getCart = (cart) => ({
	type: GET_CART,
	payload: cart,
});

const addCart = (cart) => ({
	type: ADD_CART,
	payload: cart,
});

const initialState = { cart: null };

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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART: {
            const newState = {...state, cart: action.payload}
			return newState;
        }
		case ADD_CART: {
            const newState = {...state, cart: action.payload}
			return newState;
        }
		default:
			return state;
	}
}
