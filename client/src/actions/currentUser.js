export const setCurrentUser = (result) => {
	return {
		type: "FETCH_CURRENT_USER",
		payload: result,
	};
};
