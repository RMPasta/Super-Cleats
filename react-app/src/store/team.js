const GET_TEAMS = "teams/GET_TEAMS";

const getTeams = (teams) => ({
	type: GET_TEAMS,
	payload: teams,
});

const initialState = { teams: null };

export const getTeamsThunk = () => async (dispatch) => {
	const response = await fetch("/api/teams/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(getTeams(data.teams));
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_TEAMS:
            const newState = {...state, teams: action.payload}
			return newState;
		default:
			return state;
	}
}
