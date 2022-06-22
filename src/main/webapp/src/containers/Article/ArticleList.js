import { connect } from "react-redux";
import { deleteArticle } from "../../services/actions";
import ArticleList from "../../components/Article/ArticleList";

const mapStateToProps = (state) => {
	return {
		articleObject: state.article,
	};
};

const mapDipstachToProps = (disptach) => {
	return {
		deleteArticle: (articleId) => disptach(deleteArticle(articleId)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(ArticleList);
