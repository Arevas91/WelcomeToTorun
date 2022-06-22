import { connect } from "react-redux";
import {
	fetchArticle,
	saveArticleRating,
	fetchArticeRating,
} from "../../services/actions";
import ArticleUserView from "../../components/Article/ArticleUserView";

const mapStateToProps = (state) => {
	return {
		articleObject: state.article,
		ratingObject: state.rating,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
		saveArticleRating: (articleId, rating) =>
			dispatch(saveArticleRating(articleId, rating)),
		fetchArticeRating: (articleId) => dispatch(fetchArticeRating(articleId)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(ArticleUserView);
