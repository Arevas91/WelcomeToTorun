import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faSignInAlt,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/Auth/AuthService";
import { clearMessage } from "../../services/actions";
import "../../index.css";
import { history } from "./history";
import EventBus from "./EventBus";

class NavigationBar extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
		this.state = {
			currentUser: undefined,
		};
		history.listen((location) => {
			props.dispatch(clearMessage());
		});
	}

	componentDidMount() {
		const user = this.props.user;
		if (user) {
			this.setState({
				currentUser: user,
			});
		}

		EventBus.on("logout", () => {
			this.logOut();
		  });
	};

	componentWillUnmount() {
		EventBus.remove("logout");
	}

	logOut() {
		AuthService.logout();

	}

	guestLinks = (
		<>
			<Nav className='mr-auto'>
				<Link to={"register"} className='nav-link'>
					<FontAwesomeIcon icon={faUserPlus} /> Rejestracja
				</Link>
				<Link to={"login"} className='nav-link'>
					<FontAwesomeIcon icon={faSignInAlt} /> Logowanie
				</Link>
			</Nav>
		</>
	);

	userLinks = (
		<>
			<Nav className='mr-auto'>
				<Link to={"/user/article/list"} className='nav-link'>
					Artykuły
				</Link>
				<Link to={"/user/tourist-attraction/list"} className='nav-link'>
					Atrakcje
				</Link>
				<Link to={"/user/sport-team/list"} className='nav-link'>
					Kluby sportowe
				</Link>
			</Nav>
			<Nav className='navbar-right'>
				<Link to={"/"} className='nav-link' onClick={this.logOut}>
					<FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
				</Link>
			</Nav>
		</>
	);

	adminLinks = (
		<>
			<Nav className='mr-auto'>
				<Link to={"/article/list"} className='nav-link'>
					Artykuły
				</Link>
				<Link to={"/tourist-attraction/list"} className='nav-link'>
					Atrakcje
				</Link>
				<Link to={"/sport-team/list"} className='nav-link'>
					Kluby sportowe
				</Link>
			</Nav>
			<Nav className='navbar-right'>
				<Link to={"/"} className='nav-link' onClick={this.logOut}>
					<FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
				</Link>
			</Nav>
		</>
	);

	render() {
		const { user: currentUser } = this.props;

		return (
			<Navbar bg='dark' variant='dark'>
				<Link to={"/"} className='navbar-brand'>
					<Link to={currentUser ? "/" : ""} className='navbar-brand' />
					&nbsp; Witaj w Toruniu!
				</Link>
				<Nav className='mr-auto'>
					{currentUser
						? currentUser.roles.includes("ROLE_ADMIN")
							? this.adminLinks
							: this.userLinks
						: this.guestLinks}
				</Nav>
			</Navbar>
		);
	}
}

export default NavigationBar;
