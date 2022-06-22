import { connect } from "react-redux";
import {
	saveSportTeam,
	fetchSportTeam,
	updateSportTeam,
} from "../../services/actions";
import SportTeam from "../../components/SportTeam/SportTeam";

const mapStateToProps = (state) => {
	return {
		sportTeamObject: state.sportTeam,
	};
};

const mapDipstachToProps = (dispatch) => {
	return {
		saveSportTeam: (sportTeam) => dispatch(saveSportTeam(sportTeam)),
		fetchSportTeam: (sportTeamId) => dispatch(fetchSportTeam(sportTeamId)),
		updateSportTeam: (sportTeamId, sportTeam) =>
			dispatch(updateSportTeam(sportTeamId, sportTeam)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(SportTeam);
