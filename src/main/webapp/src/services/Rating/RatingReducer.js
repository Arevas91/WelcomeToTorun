const saveArticleRatingHandler = state => ({...state});
const fetchArticleRatingHandler = state => ({...state});
const saveTouristAttractionRatingHandler = state => ({...state});
const fetchTouristAttractionRatingHandler = state => ({...state});
const saveSportTeamHandler = state => ({...state});
const fetchSportTeamHandler = state => ({...state});

const successRatingHandler = (state, action) => {
    return {
        ...state,
        rating: action.payload,
        error: ""
    }
};

const failureRatingHandler = (state, action) => {
    return {
        ...state,
        rating: "",
        error: action.payload
    }
};


const initialState = {
    rating: "",
    error: ""
};

export const ratingReducer = (state = initialState, action) => {
    const actionMap = {
        SAVE_ARTICLE_RATING_REQUEST: saveArticleRatingHandler,
        FETCH_ARTICLE_RATING_REQUEST: fetchArticleRatingHandler,
        SAVE_TOURIST_ATTRACTION_RATING_REQUEST: saveTouristAttractionRatingHandler,
        FETCH_TOURIST_ATTRACTION_RATING_REQUEST: fetchTouristAttractionRatingHandler,
        SAVE_SPORT_TEAM_RATING_REQUEST: saveSportTeamHandler,
        FETCH_SPORT_TEAM_RATING_REQUEST: fetchSportTeamHandler,
        RATING_SUCCESS: successRatingHandler,
        RATING_FAILURE: failureRatingHandler
        
    };

    if(actionMap[action.type]) return actionMap[action.type](state, action);

    return state;
};