import React, { Component } from "react";

import { Card, Table, ButtonGroup, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faList,
	faEdit,
	faTrash,
	faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../Main/MyToast";
import axios from "axios";
import authHeader from "../../services/Auth/AuthHeader";
import AuthService from "../../services/Auth/AuthService";
import EventBus from "../Main/EventBus";

export default class SportTeamList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
		};
	}

	componentDidMount() {
		this.findAllSportTeams();

		EventBus.on("logout", () => {
			this.logOut();
		});
	}

	componentWillUnmount() {
		EventBus.remove("logout");
	}

	logOut() {
		AuthService.logout();
		this.props.history.push("/");
	}

	findAllSportTeams() {
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
					EventBus.dispatch("logout");
				}
			});
	}

	deleteSportTeam = (sportTeamId) => {
		this.props.deleteSportTeam(sportTeamId);
		setTimeout(() => {
			if (this.props.sportTeamObject != null) {
				this.setState({ show: true });
				setTimeout(() => this.setState({ show: false }), 3000);
			} else {
				this.setState({ show: false });
			}
		}, 500);
		setTimeout(() => {
			window.location.reload(true);
		}, 1000);
	};

	render() {
		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={"Drużyna sportowa usunięta poprawnie"}
						type={"danger"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Row>
						<Col>
							<Card.Header>
								<FontAwesomeIcon icon={faList} /> Lista drużyn sportowych
							</Card.Header>
						</Col>
						<Col style={{ display: "flex", justifyContent: "flex-end" }}>
							<Link to={"/sport-team/add"} className='btn btn-success'>
								<FontAwesomeIcon icon={faAdd} /> Dodaj nową drużynę
							</Link>
						</Col>
					</Row>
					<Card.Body>
						<Table bordered hover striped variant='dark'>
							<thead>
								<tr>
									<th>Nazwa</th>
									<th>Ulica</th>
									<th>Stadion</th>
									<th>Rok założenia</th>
									<th>Barwy klubowe</th>
									<th>Dyscyplina</th>
									<th>Historia</th>
									<th>Zdjęcie</th>
									<th>Akcje</th>
								</tr>
							</thead>
							<tbody>
								{this.state.teams.length === 0 ? (
									<tr align='center'>
										<td colSpan='6'>Nie ma żadnych drużyn sportowych.</td>
									</tr>
								) : (
									this.state.teams.map((team) => (
										<tr key={team.id}>
											<td>{team.name}</td>
											<td>{team.street}</td>
											<td>{team.stadium}</td>
											<td>{team.yearOfEstablishment}</td>
											<td>{team.clubColors}</td>
											<td>{team.discipline}</td>
											<td>{team.history}</td>
											<td>
												<img src={team.coverPhotoURL} height='100' />
											</td>
											<td>
												<ButtonGroup>
													<Link
														to={"/sport-team/list/" + team.id}
														className='btn btn-sm btn-outline-primary'>
														<FontAwesomeIcon icon={faEdit} />
													</Link>{" "}
													<Button
														size='sm'
														variant='outline-danger'
														onClick={this.deleteSportTeam.bind(this, team.id)}>
														<FontAwesomeIcon icon={faTrash} />
													</Button>
												</ButtonGroup>
											</td>
										</tr>
									))
								)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
