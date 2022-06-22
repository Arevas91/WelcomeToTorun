import {connect} from 'react-redux';
import NavigationBar from '../../components/Main/NavigationBar';

const mapStateToProps = state => {
    const { user } = state.auth;

	return {
		user,
	};
};

export default connect(mapStateToProps)(NavigationBar);