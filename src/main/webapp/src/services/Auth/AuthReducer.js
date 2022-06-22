const registerSuccesHandler = (state) => {
	return {
		...state,
		isLoggedIn: false,
	};
};

const registerFailHandler = (state) => {
	return {
		...state,
		isLoggedIn: false,
	};
};

const loginSuccesHandler = (state, action) => {
	return {
		...state,
		isLoggedIn: true,
		user: action.payload.user,
	};
};

const loginFailHandler = (state) => {
	return {
		...state,
		isLoggedIn: false,
		user: null,
	};
};

const logoutHandler = (state) => {
	return {
		...state,
		isLoggedIn: false,
		user: null,
	};
};

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

export const authReducer = (state = initialState, action) => {
	const actionMap = {
		REGISTER_SUCCESS: registerSuccesHandler,
		REGISTER_FAIL: registerFailHandler,
		LOGIN_SUCCESS: loginSuccesHandler,
		LOGIN_FAIL: loginFailHandler,
		LOGOUT: logoutHandler,
	};

	if (actionMap[action.type]) return actionMap[action.type](state, action);

	return state;
};
