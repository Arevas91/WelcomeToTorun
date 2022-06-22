import { connect } from "react-redux";
import { deleteSportTeam } from "../../services/actions";
import SportTeamList from "../../components/SportTeam/SportTeamList";

const mapStateToProps = (state) => {
	return {
		sportTeamObject: state.sportTeam,
	};
};

const mapDipstachToProps = (disptach) => {
	return {
		deleteSportTeam: (sportTeamId) => disptach(deleteSportTeam(sportTeamId)),
	};
};

export default connect(mapStateToProps, mapDipstachToProps)(SportTeamList);
