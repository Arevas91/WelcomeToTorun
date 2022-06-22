import { connect } from "react-redux";
import {
	saveArticle,
	fetchArticle,
	updateArticle,
} from "../../services/actions";
import Article from "../../components/Article/Article";

const mapStateToProps = (state) => {
	return {
		articleObject: state.article,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		saveArticle: (article) => dispatch(saveArticle(article)),
		fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
		updateArticle: (articleId, article) =>
			dispatch(updateArticle(articleId, article)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(Article);
