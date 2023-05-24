const GET_TICKETS = "TICKETs/GET_TICKETS";
const ADD_TICKET = "TICKETs/ADD_TICKET";
const EDIT_TICKET = "TICKETs/EDIT_TICKET";
const DELETE_TICKET = "TICKETs/DELETE_TICKET";

const getTickets = (tickets) => ({
	type: GET_TICKETS,
	payload: tickets,
});

const addTicket = (ticket) => ({
	type: ADD_TICKET,
	payload: ticket,
});

const editTicket = (ticket) => ({
	type: EDIT_TICKET,
	payload: ticket,
});

const deleteTicket = (ticket) => ({
	type: DELETE_TICKET,
	payload: ticket,
});



export const getTicketsThunk = () => async (dispatch) => {
    const response = await fetch("/api/tickets/", {
        headers: {
            "Content-Type": "application/json",
		},
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(getTickets(data.tickets));
	}
};

export const addTicketThunk = (ticket) => async (dispatch) => {
    const response = await fetch("/api/tickets/", {
        method: "POST",
		body: ticket
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(addTicket(data.ticket));
	}
};

export const editTicketThunk = (ticket, ticketId) => async (dispatch) => {
    const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
		body: ticket
	});
	if (response.ok) {
        const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(editTicket(data));
	}
};

export const deleteTicketThunk = (ticketId) => async (dispatch) => {
    const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "DELETE",
		body: JSON.stringify()
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
            return;
		}
		dispatch(deleteTicket(ticketId));
	}
};

const initialState = { tickets: null, usertickets: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TICKETS: {
            const newState = {...state, tickets: action.payload}
			return newState;
		}
		case ADD_TICKET: {
            const newState = {...state}
			newState.tickets.push(action.payload)
			return newState;
		}
		case EDIT_TICKET: {
            const newState = {...state}
			newState.tickets[action.payload.id] = action.payload
			return newState;
		}
		case DELETE_TICKET: {
            const newState = {...state}
			delete newState.tickets[action.payload]
			return newState;
		}
		default:
            return state;
        }
    }
