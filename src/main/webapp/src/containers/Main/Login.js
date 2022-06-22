import { connect } from "react-redux";
import Login from "../../components/Main/Login";

const mapStateToProps = (state) => {
	const { isLoggedIn } = state.auth;
	const { message } = state.message;

	return {
		isLoggedIn,
		message,
	};
};

export default connect(mapStateToProps)(Login);
