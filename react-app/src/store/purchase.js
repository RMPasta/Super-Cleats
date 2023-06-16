const GET_PURCHASES = "purchases/GET_PURCHASES";
const ADD_PURCHASE = "purchases/ADD_PURCHASE";
// const EDIT_PURCHASE = "purchases/EDIT_PURCHASE";
// const DELETE_PURCHASE = "purchases/DELETE_PURCHASE";

const getPurchases = (purchase) => ({
	type: GET_PURCHASES,
	payload: purchase,
});


const addPurchase = (purchase) => ({
	type: ADD_PURCHASE,
	payload: purchase,
});

// const editPURCHASE = (PURCHASE) => ({
// 	type: EDIT_PURCHASE,
// 	payload: PURCHASE,
// });

// const deletePURCHASE = (PURCHASE) => ({
// 	type: DELETE_PURCHASE,
// 	payload: PURCHASE,
// });


const initialState = { purchases: null, userPurchases: null };

export const getPurchasesThunk = () => async (dispatch) => {
	const response = await fetch("/api/purchase_history/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		console.log('PURCHASE DATAAAAAAA', data)
		if (data.errors) {
			return;
		}
		dispatch(getPurchases(data.purchase_history));
	}
};

export const addPurchaseThunk = (purchase) => async (dispatch) => {
	const response = await fetch("/api/purchase_history/", {
		method: "POST",
		body: purchase
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(addPurchase(data.purchase));
	}
};

// export const editItemThunk = (item, itemId) => async (dispatch) => {
// 	const response = await fetch(`/api/items/${itemId}`, {
// 		method: "PUT",
// 		body: item
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}
// 		dispatch(editItem(data));
// 	}
// };

// export const deleteItemThunk = (itemId) => async (dispatch) => {
// 	const response = await fetch(`/api/items/${itemId}`, {
// 		method: "DELETE",
// 		body: JSON.stringify()
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}
// 		dispatch(deleteItem(itemId));
// 	}
// };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_PURCHASES: {
            const newState = {...state, purchases: action.payload}
			return newState;
		}
		case ADD_PURCHASE: {
            const newState = {...state}
			newState.purchases.push(action.payload)
			return newState;
		}
		// case EDIT_PURCHASE: {
        //     const newState = {...state}
		// 	newState.purchases[action.payload.id] = action.payload
		// 	return newState;
		// }
		// case DELETE_PURCHASE: {
        //     const newState = {...state}
		// 	delete newState.purchases[action.payload]
		// 	return newState;
		// }
		default:
			return state;
	}
}
