import { connect } from "react-redux";
import {
	fetchTouristAttraction,
	saveTouristAttractionRating,
	fetchTouristAttractionRating,
} from "../../services/actions";
import TouristAttractionUserView from "../../components/Attraction/TouristAttractionUserView";

const mapStateToProps = (state) => {
	return {
		touristAttractionObject: state.touristAttraction,
		ratingObject: state.rating,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		fetchTouristAttraction: (touristAttractionID) =>
			dispatch(fetchTouristAttraction(touristAttractionID)),
		saveTouristAttractionRating: (touristAttractionID, rating) =>
			dispatch(saveTouristAttractionRating(touristAttractionID, rating)),
		fetchTouristAttractionRating: (touristAttractionID) =>
			dispatch(fetchTouristAttractionRating(touristAttractionID)),
	};
};

export default connect(
	mapStateToProps,
	mapDipstachToProps
)(TouristAttractionUserView);
