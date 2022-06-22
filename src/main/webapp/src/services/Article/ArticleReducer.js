const saveArticleHandler = state => ({...state});
const fetchArticleHandler = state => ({...state});
const deleteArticleHandler = state => ({...state});
const updateArticleHandler = state => ({...state});

const successArticleHandler = (state, action) => {
    return {
        ...state,
        article: action.payload,
        error: ""
    }
};

const failureArticleHandler = (state, action) => {
    return {
        ...state,
        article: "",
        error: action.payload
    }
};


const initialState = {
    article: "",
    error: ""
};

export const articleReducer = (state = initialState, action) => {
    const actionMap = {
        SAVE_ARTICLE_REQUEST: saveArticleHandler,
        FETCH_ARTICLE_REQUEST: fetchArticleHandler,
        UPDATE_ARTICLE_REQUEST: updateArticleHandler,
        DELETE_ARTICLE_REQUEST: deleteArticleHandler,
        ARTICLE_SUCCESS: successArticleHandler,
        ARTICLE_FAILURE: failureArticleHandler
    };

    if(actionMap[action.type]) return actionMap[action.type](state, action);

    return state;
};