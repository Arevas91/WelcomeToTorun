import axios from "axios";
import authHeader from "../Auth/AuthHeader";
import EventBus from "../../components/Main/EventBus";

export const SAVE_SPORT_TEAM_REQUEST = "SAVE_SPORT_TEAM_REQUEST";
export const FETCH_SPORT_TEAM_REQUEST = "FETCH_SPORT_TEAM_REQUEST";
export const UPDATE_SPORT_TEAM_REQUEST = "UPDATE_SPORT_TEAM_REQUEST";
export const DELETE_SPORT_TEAM_REQUEST = "DELETE_SPORT_TEAM_REQUEST";

export const SPORT_TEAM_SUCCESS = "SPORT_TEAM_SUCCESS";
export const SPORT_TEAM_FAILURE = "SPORT_TEAM_FAILURE";

const sportTeamSuccess = sportTeam => {
    return {
        type: SPORT_TEAM_SUCCESS,
        payload: sportTeam
    }
}

const sportTeamFailure = error => {
    return {
        type: SPORT_TEAM_FAILURE,
        payload: error
    }
}

export const saveSportTeam = sportTeam => {
    return disptach => {
        disptach({
            type: SAVE_SPORT_TEAM_REQUEST
        });
        axios.post("http://localhost:8080/auth/sport-team/add", sportTeam, { headers: authHeader() })
        .then(response => {
            disptach(sportTeamSuccess(response.data));
        })
        .catch(error => {
            disptach(sportTeamFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const fetchSportTeam = sportTeamId => {
    return disptach => {
        disptach({
            type: FETCH_SPORT_TEAM_REQUEST
        });
        axios.get("http://localhost:8080/auth/sport-team/list/"+sportTeamId, { headers: authHeader() })
        .then(response => {
            disptach(sportTeamSuccess(response.data));
        })
        .catch(error => {
            disptach(sportTeamFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const updateSportTeam = (sportTeamId, sportTeam) => {
    return disptach => {
        disptach({
            type: UPDATE_SPORT_TEAM_REQUEST
        });
        axios.put("http://localhost:8080/auth/sport-team/list/"+sportTeamId, sportTeam, { headers: authHeader() })
        .then(response => {
            disptach(sportTeamSuccess(response.data));
        })
        .catch(error => {
            disptach(sportTeamFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const deleteSportTeam = sportTeamId => {
    return disptach => {
        disptach({
            type: DELETE_SPORT_TEAM_REQUEST
        });
        axios.delete("http://localhost:8080/auth/sport-team/list/"+sportTeamId, { headers: authHeader() })
        .then(response => {
            disptach(sportTeamSuccess(response.data));
        })
        .catch(error => {
            disptach(sportTeamFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}