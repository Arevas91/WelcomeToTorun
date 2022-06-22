import React, { Component } from "react";
import "../../../src/index.css";

import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/Auth/AuthHeader";
import EventBus from "../Main/EventBus";
import AuthService from "../../services/Auth/AuthService";

export default class SportTeamListUserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
		};
	}

	componentDidMount = () => {
		this.findAllSportTeams();

		EventBus.on("logout", () => {
			this.logOut();
		});
	};

	componentWillUnmount() {
		EventBus.remove("logout");
	}

	logOut() {
		AuthService.logout();
		this.props.history.push("/");
	}

	findAllSportTeams = () => {
		axios
			.get("http://localhost:8080/auth/sport-team/list", {
				headers: authHeader(),
			})
			.then((response) => response.data)
			.then((data) => {
				this.setState({ teams: data });
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					if (error.response && error.response.status === 401) {
						EventBus.dispatch("logout");
					}
				}
			});
	};

	render() {
		return (
			<div>
				<Card className={"border border-dark bg-dark"}>
					<Row>
						{this.state.teams.map((team, index) => (
							<Col sm key={index} align='center' className='leading'>
								<Card style={{ width: "18rem" }}>
									<Card.Img
										variant='top'
										src={team.coverPhotoURL}
										height='150px'
									/>
									<Card.Body>
										<Card.Title className='shortText'>{team.name}</Card.Title>
										<Card.Text className='shortText'>{team.history}</Card.Text>
										<Link to={"list/" + team.id} className='btn btn-info'>
											Sprawdź szczegóły
										</Link>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Card>
			</div>
		);
	}
}
