import { connect } from "react-redux";
import {
	saveTouristAttraction,
	fetchTouristAttraction,
	updateTouristAttraction,
} from "../../services/actions";
import TouristAttraction from "../../components/Attraction/TouristAttraction";

const mapStateToProps = (state) => {
	return {
		touristAttractionObject: state.touristAttraction,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		saveTouristAttraction: (touristAttraction) =>
			dispatch(saveTouristAttraction(touristAttraction)),
		fetchTouristAttraction: (touristAttractionId) =>
			dispatch(fetchTouristAttraction(touristAttractionId)),
		updateTouristAttraction: (touristAttractionId, touristAttraction) =>
			dispatch(updateTouristAttraction(touristAttractionId, touristAttraction)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(TouristAttraction);
