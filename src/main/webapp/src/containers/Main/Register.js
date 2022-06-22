import { connect } from "react-redux";
import Register from "../../components/Main/Register";

const mapStateToProps = (state) => {
	const { message } = state.message;

	return {
		message,
	};
};

export default connect(mapStateToProps)(Register);
