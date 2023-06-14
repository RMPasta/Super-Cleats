const GET_CART = "cart/GET_CART";
const CREATE_CART = "cart/CREATE_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const ADD_TICKET_TO_CART = "cart/ADD_TICKET_TO_CART";
const REMOVE_TICKET_FROM_CART = "cart/REMOVE_TICKET_FROM_CART";
const CLEAR_CART = "cart/REMOVE_FROM_CART";
const DELETE_CART = "cart/DELETE_CART";

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart,
});

const createCart = (cart_and_items) => ({
  type: CREATE_CART,
  payload: cart_and_items,
});

const addToCart = (cart) => ({
  type: ADD_TO_CART,
  payload: cart,
});

const removeFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  payload: cart,
});

const addTicketToCart = (cart) => ({
  type: ADD_TICKET_TO_CART,
  payload: cart,
});

const removeTicketFromCart = (cart) => ({
  type: REMOVE_TICKET_FROM_CART,
  payload: cart,
});

const clearCart = (cart) => ({
  type: CLEAR_CART,
  payload: cart,
});

const deleteCart = (cart) => ({
  type: DELETE_CART,
  payload: cart,
});

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

export const createCartThunk = (userId) => async (dispatch) => {
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
    dispatch(createCart(data));
  }
};

export const addToCartThunk = (obj) => async (dispatch) => {
  const response = await fetch(`/api/cart/${obj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addToCart(data));
  }
};

export const removeFromCartThunk = (obj) => async (dispatch) => {
  const response = await fetch(`/api/cart/${obj.id}/remove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(removeFromCart(data));
  }
};

export const addTicketToCartThunk = (obj) => async (dispatch) => {
  const response = await fetch(`/api/cart/${obj.id}/ticket`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addTicketToCart(data));
  }
};

export const removeTicketFromCartThunk = (obj) => async (dispatch) => {
  const response = await fetch(`/api/cart/${obj.id}/remove/ticket`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(removeTicketFromCart(data));
  }
};

export const clearCartThunk = (cartId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${cartId}/clear`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartId),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(clearCart(data));
  }
};

export const deleteCartThunk = (cart) => async (dispatch) => {
  const response = await fetch(`/api/cart/${cart.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart.id),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteCart(data));
  }
};

const initialState = { cart: null, cartItems: null, cartTickets: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      const newState = {
        ...state,
        cart: action.payload.cart,
        cartItems: action.payload.items,
        cartTickets: action.payload.tickets,
      };
      return newState;
    }
    case CREATE_CART: {
      const newState = { ...state, cart: action.payload };
      return newState;
    }
    case ADD_TO_CART: {
      const newState = { ...state };
      newState.cart = action.payload;
      return newState;
    }
    case REMOVE_FROM_CART: {
      const newState = { ...state };
      newState.cart = action.payload;
      return newState;
    }
    case ADD_TICKET_TO_CART: {
      const newState = { ...state };
      newState.cart = action.payload;
      return newState;
    }
    case REMOVE_TICKET_FROM_CART: {
      const newState = { ...state };
      newState.cart = action.payload;
      return newState;
    }
    case CLEAR_CART: {
      const newState = { ...state };
      newState.cart = {};
      return newState;
    }
    case DELETE_CART: {
      const newState = { ...state };
      newState.cart = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
