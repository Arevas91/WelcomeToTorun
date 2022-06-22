const setMessageHandler = (state, action) => {
	return {
		...state,
		message: action.payload,
	};
};

const clearMessageHandler = (state) => {
	return {
		...state,
		message: "",
	};
};

const initialState = {};

export const messageReducer = (state = initialState, action) => {
	const actionMap = {
		SET_MESSAGE: setMessageHandler,
		CLEAR_MESSAGE: clearMessageHandler,
	};

	if (actionMap[action.type]) return actionMap[action.type](state, action);

	return state;
};
