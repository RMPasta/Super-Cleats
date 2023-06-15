const GET_FAVORITES = "favorites/GET_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const EDIT_FAVORITE = "favorites/EDIT_FAVORITE";
const DELETE_FAVORITE = "favorites/DELETE_FAVORITE";

const getFavorites = (favorites) => ({
	type: GET_FAVORITES,
	payload: favorites,
});

const addFavorite = (favorite) => ({
	type: ADD_FAVORITE,
	payload: favorite,
});

const editFavorite = (favorite) => ({
	type: EDIT_FAVORITE,
	payload: favorite,
});

const deleteFavorite = (favorite) => ({
	type: DELETE_FAVORITE,
	payload: favorite,
});



export const getFavoritesThunk = () => async (dispatch) => {
    const response = await fetch("/api/favorites/", {
        headers: {
            "Content-Type": "application/json",
		},
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(getFavorites(data.favorites));
	}
};

export const addFavoriteThunk = (favorite) => async (dispatch) => {
    const response = await fetch("/api/favorites/", {
        method: "POST",
		body: favorite
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(addFavorite(data.favorite));
	}
};

export const editFavoriteThunk = (favorite, favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "PUT",
		body: favorite
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(editFavorite(data));
	}
};

export const deleteFavoriteThunk = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
		body: JSON.stringify()
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(deleteFavorite(favoriteId));
	}
};

const initialState = { favorites: null, userFavorites: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_FAVORITES: {
            const newState = {...state, favorites: action.payload}
			return newState;
		}
		case ADD_FAVORITE: {
            const newState = {...state}
			newState.favorites.push(action.payload)
			return newState;
		}
		case EDIT_FAVORITE: {
            const newState = {...state}
			newState.favorites[action.payload.id] = action.payload
			return newState;
		}
		case DELETE_FAVORITE: {
            const newState = {...state}
			delete newState.favorites[action.payload]
			return newState;
		}
		default:
            return state;
        }
    }
