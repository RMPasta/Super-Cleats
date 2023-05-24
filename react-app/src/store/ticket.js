const GET_TICKETS = "tickets/GET_TICKETS";
const DELETE_TICKET = "tickets/DELETE_TICKET";

const getTickets = (tickets) => ({
	type: GET_TICKETS,
	payload: tickets,
});

const deleteTicket = (tickets) => ({
	type: DELETE_TICKET,
	payload: tickets,
});


const initialState = { tickets: null, userTickets: null };

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

export const deleteTicketsThunk = (ticketId) => async (dispatch) => {
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

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TICKETS: {
            const newState = {...state, tickets: action.payload}
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
