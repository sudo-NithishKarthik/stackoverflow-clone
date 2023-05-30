const authReducer = (state = {}, action) => {
	switch (action.type) {
		case "AUTH":
			localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
			return { ...state, data: action?.data };
		case "LOG_OUT":
			localStorage.clear();
			return { ...state, data: null };
		default:
			return state;
	}
};

export default authReducer;
