const saveSportTeamHandler = state => ({...state});
const fetchSportTeamHandler = state => ({...state});
const deleteSportTeamHandler = state => ({...state});
const updateSportTeamHandler = state => ({...state});

const successSportTeamHandler = (state, action) => {
    return {
        ...state,
        sportTeam: action.payload,
        error: ""
    }
};

const failureSportTeamHandler = (state, action) => {
    return {
        ...state,
        sportTeam: "",
        error: action.payload
    }
};


const initialState = {
    sportTeam: "",
    error: ""
};

export const sportTeamReducer = (state = initialState, action) => {
    const actionMap = {
        SAVE_SPORT_TEAM_REQUEST: saveSportTeamHandler,
        FETCH_SPORT_TEAM_REQUEST: fetchSportTeamHandler,
        UPDATE_SPORT_TEAM_REQUEST: updateSportTeamHandler,
        DELETE_SPORT_TEAM_REQUEST: deleteSportTeamHandler,
        SPORT_TEAM_SUCCESS: successSportTeamHandler,
        SPORT_TEAM_FAILURE: failureSportTeamHandler
    };

    if(actionMap[action.type]) return actionMap[action.type](state, action);

    return state;
};