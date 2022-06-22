import axios from "axios";
import authHeader from "../Auth/AuthHeader";
import EventBus from "../../components/Main/EventBus";

export const SAVE_TOURIST_ATTRACTION_REQUEST = "SAVE_TOURIST_ATTRACTION_REQUEST";
export const FETCH_TOURIST_ATTRACTION_REQUEST = "FETCH_TOURIST_ATTRACTION_REQUEST";
export const UPDATE_TOURIST_ATTRACTION_REQUEST = "UPDATE_TOURIST_ATTRACTION_REQUEST";
export const DELETE_TOURIST_ATTRACTION_REQUEST = "DELETE_TOURIST_ATTRACTION_REQUEST";

export const TOURIST_ATTRACTION_SUCCESS = "TOURIST_ATTRACTION_SUCCESS";
export const TOURIST_ATTRACTION_FAILURE = "TOURIST_ATTRACTION_FAILURE";

const touristAttractionSuccess = touristAttraction => {
    return {
        type: TOURIST_ATTRACTION_SUCCESS,
        payload: touristAttraction
    }
}

const touristAttractionFailure = error => {
    return {
        type: TOURIST_ATTRACTION_FAILURE,
        payload: error
    }
}

export const saveTouristAttraction = touristAttraction => {
    return disptach => {
        disptach({
            type: SAVE_TOURIST_ATTRACTION_REQUEST
        });
        axios.post("http://localhost:8080/auth/tourist-attraction/add", touristAttraction, { headers: authHeader() })
        .then(response => {
            disptach(touristAttractionSuccess(response.data));
        })
        .catch(error => {
            disptach(touristAttractionFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const fetchTouristAttraction = touristAttractionId => {
    return disptach => {
        disptach({
            type: FETCH_TOURIST_ATTRACTION_REQUEST
        });
        axios.get("http://localhost:8080/auth/tourist-attraction/list/"+touristAttractionId, { headers: authHeader() })
        .then(response => {
            disptach(touristAttractionSuccess(response.data));
        })
        .catch(error => {
            disptach(touristAttractionFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const updateTouristAttraction = (touristAttractionId, touristAttraction) => {
    return disptach => {
        disptach({
            type: UPDATE_TOURIST_ATTRACTION_REQUEST
        });
        axios.put("http://localhost:8080/auth/tourist-attraction/list/"+touristAttractionId, touristAttraction, { headers: authHeader() })
        .then(response => {
            disptach(touristAttractionSuccess(response.data));
        })
        .catch(error => {
            disptach(touristAttractionFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const deleteTouristAttraction = touristAttractionId => {
    return disptach => {
        disptach({
            type: DELETE_TOURIST_ATTRACTION_REQUEST
        });
        axios.delete("http://localhost:8080/auth/tourist-attraction/list/"+touristAttractionId, { headers: authHeader() })
        .then(response => {
            disptach(touristAttractionSuccess(response.data));
        })
        .catch(error => {
            disptach(touristAttractionFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}