import axios from "axios";
import authHeader from "../Auth/AuthHeader";
import EventBus from "../../components/Main/EventBus";

export const SAVE_ARTICLE_RATING_REQUEST = "SAVE_ARTICLE_RATING_REQUEST";
export const FETCH_ARTICLE_RATING_REQUEST = "FETCH_ARTICLE_RATING_REQUEST";
export const SAVE_TOURIST_ATTRACTION_RATING_REQUEST = "SAVE_TOURIST_ATTRACTION_RATING_REQUEST";
export const FETCH_TOURIST_ATTRACTION_RATING_REQUEST = "FETCH_TOURIST_ATTRACTION_RATING_REQUEST";
export const SAVE_SPORT_TEAM_RATING_REQUEST = "SAVE_SPORT_TEAM_RATING_REQUEST";
export const FETCH_SPORT_TEAM_RATING_REQUEST = "FETCH_SPORT_TEAM_RATING_REQUEST";

export const RATING_SUCCESS = "RATING_SUCCESS";
export const RATING_FAILURE = "RATING_FAILURE";

const ratingSuccess = (rating) => {
	return {
		type: RATING_SUCCESS,
		payload: rating,
	};
};

const ratingFailure = (error) => {
	return {
		type: RATING_FAILURE,
		payload: error,
	};
};

export const saveArticleRating = (articleId, rating) => {
	return (dispatch) => {
		dispatch({
			type: SAVE_ARTICLE_RATING_REQUEST,
		});
		axios
			.post(
				"http://localhost:8080/auth/rating/add/list/article/" + articleId,
				rating, { headers: authHeader() }
			)
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};

export const fetchArticeRating = (articleId) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_ARTICLE_RATING_REQUEST,
		});
		axios
			.get("http://localhost:8080/auth/rating/list/article/" + articleId, { headers: authHeader() })
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};

export const saveTouristAttractionRating = (touristAttractionID, rating) => {
	return (dispatch) => {
		dispatch({
			type: SAVE_TOURIST_ATTRACTION_RATING_REQUEST,
		});
		axios
			.post(
				"http://localhost:8080/auth/rating/add/list/tourist-attraction/" + touristAttractionID,
				rating, { headers: authHeader() }
			)
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};

export const fetchTouristAttractionRating = (touristAttractionID) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_TOURIST_ATTRACTION_RATING_REQUEST,
		});
		axios
			.get("http://localhost:8080/auth/rating/list/tourist-attraction/" + touristAttractionID, { headers: authHeader() })
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};

export const saveSportTeamRating = (sportTeamID, rating) => {
	return (dispatch) => {
		dispatch({
			type: SAVE_SPORT_TEAM_RATING_REQUEST,
		});
		axios
			.post(
				"http://localhost:8080/auth/rating/add/list/sport-team/" + sportTeamID,
				rating, { headers: authHeader() }
			)
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};

export const fetchSportTeamRating = (sportTeamID) => {
	return (dispatch) => {
		dispatch({
			type: FETCH_SPORT_TEAM_RATING_REQUEST,
		});
		axios
			.get("http://localhost:8080/auth/rating/list/sport-team/" + sportTeamID, { headers: authHeader() })
			.then((response) => {
				dispatch(ratingSuccess(response.data));
			})
			.catch((error) => {
				dispatch(ratingFailure(error));
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	};
};
