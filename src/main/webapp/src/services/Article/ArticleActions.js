import axios from "axios";
import authHeader from "../Auth/AuthHeader";
import EventBus from "../../components/Main/EventBus";

export const SAVE_ARTICLE_REQUEST = "SAVE_ARTICLE_REQUEST";
export const FETCH_ARTICLE_REQUEST = "FETCH_ARTICLE_REQUEST";
export const UPDATE_ARTICLE_REQUEST = "UPDATE_ARTICLE_REQUEST";
export const DELETE_ARTICLE_REQUEST = "DELETE_ARTICLE_REQUEST";

export const ARTICLE_SUCCESS = "ARTICLE_SUCCESS";
export const ARTICLE_FAILURE = "ARTICLE_FAILURE";

const articleSuccess = article => {
    return {
        type: ARTICLE_SUCCESS,
        payload: article
    }
}

const articleFailure = error => {
    return {
        type: ARTICLE_FAILURE,
        payload: error
    }
}

export const saveArticle = article => {
    return disptach => {
        disptach({
            type: SAVE_ARTICLE_REQUEST
        });
        axios.post("http://localhost:8080/auth/article/add", article, { headers: authHeader() })
        .then(response => {
            disptach(articleSuccess(response.data));
        })
        .catch(error => {
            disptach(articleFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const fetchArticle = articleId => {
    return disptach => {
        disptach({
            type: FETCH_ARTICLE_REQUEST
        });
        axios.get("http://localhost:8080/auth/article/list/"+articleId, { headers: authHeader() })
        .then(response => {
            disptach(articleSuccess(response.data));
        })
        .catch(error => {
            disptach(articleFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const updateArticle = (articleId, article) => {
    return disptach => {
        disptach({
            type: UPDATE_ARTICLE_REQUEST
        });
        axios.put("http://localhost:8080/auth/article/list/"+articleId, article, { headers: authHeader() })
        .then(response => {
            disptach(articleSuccess(response.data));
        })
        .catch(error => {
            disptach(articleFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

export const deleteArticle = articleId => {
    return disptach => {
        disptach({
            type: DELETE_ARTICLE_REQUEST
        });
        axios.delete("http://localhost:8080/auth/article/list/"+articleId, { headers: authHeader() })
        .then(response => {
            disptach(articleSuccess(response.data));
        })
        .catch(error => {
            disptach(articleFailure(error));
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        })
    }
}

