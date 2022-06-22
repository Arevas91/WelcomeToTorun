const saveTouristAttractionHandler = state => ({...state});
const fetchTouristAttractionHandler = state => ({...state});
const deleteTouristAttractionHandler = state => ({...state});
const updateTouristAttractionHandler = state => ({...state});

const successTouristAttractionHandler = (state, action) => {
    return {
        ...state,
        touristAttraction: action.payload,
        error: ""
    }
};

const failureTouristAttractionHandler = (state, action) => {
    return {
        ...state,
        touristAttraction: "",
        error: action.payload
    }
};


const initialState = {
    touristAttraction: "",
    error: ""
};

export const touristAttractionReducer = (state = initialState, action) => {
    const actionMap = {
        SAVE_TOURIST_ATTRACTION_REQUEST: saveTouristAttractionHandler,
        FETCH_TOURIST_ATTRACTION_REQUEST: fetchTouristAttractionHandler,
        UPDATE_TOURIST_ATTRACTION_REQUEST: updateTouristAttractionHandler,
        DELETE_TOURIST_ATTRACTION_REQUEST: deleteTouristAttractionHandler,
        TOURIST_ATTRACTION_SUCCESS: successTouristAttractionHandler,
        TOURIST_ATTRACTION_FAILURE: failureTouristAttractionHandler
    };

    if(actionMap[action.type]) return actionMap[action.type](state, action);

    return state;
};