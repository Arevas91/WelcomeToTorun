import { connect } from "react-redux";
import { deleteTouristAttraction } from "../../services/actions";
import TouristAttractionList from "../../components/Attraction/TouristAttractionList";

const mapStateToProps = (state) => {
	return {
		touristAttractionObject: state.touristAttracion,
	};
};

const mapDipstachToProps = (disptach) => {
	return {
		deleteTouristAttraction: (touristAttractionId) =>
			disptach(deleteTouristAttraction(touristAttractionId)),
	};
};

export default connect(
	mapStateToProps,
	mapDipstachToProps
)(TouristAttractionList);
