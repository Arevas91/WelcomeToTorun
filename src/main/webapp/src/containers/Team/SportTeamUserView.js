import { connect } from "react-redux";
import {
	fetchSportTeam,
	saveSportTeamRating,
	fetchSportTeamRating,
} from "../../services/actions";
import SportTeamUserView from "../../components/SportTeam/SportTeamUserView";

const mapStateToProps = (state) => {
	return {
		sportTeamObject: state.sportTeam,
		ratingObject: state.rating,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		fetchSportTeam: (sportTeamID) => dispatch(fetchSportTeam(sportTeamID)),
		saveSportTeamRating: (sportTeamID, rating) =>
			dispatch(saveSportTeamRating(sportTeamID, rating)),
		fetchSportTeamRating: (sportTeamID) =>
			dispatch(fetchSportTeamRating(sportTeamID)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(SportTeamUserView);
