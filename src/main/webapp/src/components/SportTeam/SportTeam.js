import React, { Component } from "react";

import { Card, Form, Button, Col, Row, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSave,
	faPlusSquare,
	faUndo,
	faList,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../Main/MyToast";
import validator from "validator";
import AuthService from "../../services/Auth/AuthService";
import EventBus from "../Main/EventBus";

export default class SportTeam extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
	}

	initialState = {
		id: "",
		name: "",
		street: "",
		stadium: "",
		yearOfEstablishment: "",
		clubColors: "",
		discipline: "",
		history: "",
		coverPhotoURL: "",
	};

	resetSportTeam = () => {
		this.setState(() => this.initialState);
	};

	componentDidMount() {
		const sportTeamId = +this.props.match.params.id;
		if (sportTeamId) {
			this.findSportTeamById(sportTeamId);
		}

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

	findSportTeamById = (sportTeamId) => {
		this.props.fetchSportTeam(sportTeamId);
		setTimeout(() => {
			let sportTeam = this.props.sportTeamObject.sportTeam;
			if (sportTeam != null) {
				this.setState({
					id: sportTeam.id,
					name: sportTeam.name,
					street: sportTeam.street,
					stadium: sportTeam.stadium,
					yearOfEstablishment: sportTeam.yearOfEstablishment,
					clubColors: sportTeam.clubColors,
					discipline: sportTeam.discipline,
					history: sportTeam.history,
					coverPhotoURL: sportTeam.coverPhotoURL,
				});
			}
		}, 1000);
	};

	saveSportTeam = (event) => {
		event.preventDefault();

		const sportTeam = {
			name: this.state.name,
			street: this.state.street,
			stadium: this.state.stadium,
			yearOfEstablishment: this.state.yearOfEstablishment,
			clubColors: this.state.clubColors,
			discipline: this.state.discipline,
			history: this.state.history,
			coverPhotoURL: this.state.coverPhotoURL,
		};

		if (
			sportTeam.name.length < 5 ||
			sportTeam.street.length < 3 ||
			sportTeam.stadium.length < 5 ||
			!validator.isDate(sportTeam.yearOfEstablishment) ||
			sportTeam.clubColors.length < 3 ||
			sportTeam.discipline.length < 3 ||
			sportTeam.history.length < 10 ||
			!validator.isURL(sportTeam.coverPhotoURL)
		) {
			this.sportTeamValidated();
		} else {
			this.sportTeamValidatedClose();
			this.props.saveSportTeam(sportTeam);
			setTimeout(() => {
				if (this.props.sportTeamObject.sportTeam != null) {
					this.setState({ show: true, method: "post" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			this.setState(this.initialState);
		}
	};

	updateSportTeam = (event) => {
		event.preventDefault();

		const sportTeam = {
			name: this.state.name,
			street: this.state.street,
			stadium: this.state.stadium,
			yearOfEstablishment: this.state.yearOfEstablishment,
			clubColors: this.state.clubColors,
			discipline: this.state.discipline,
			history: this.state.history,
			coverPhotoURL: this.state.coverPhotoURL,
		};
		if (
			sportTeam.name.length < 5 ||
			sportTeam.street.length < 3 ||
			sportTeam.stadium.length < 5 ||
			!validator.isDate(sportTeam.yearOfEstablishment) ||
			sportTeam.clubColors.length < 3 ||
			sportTeam.discipline.length < 3 ||
			sportTeam.history.length < 10 ||
			!validator.isURL(sportTeam.coverPhotoURL)
		) {
			this.sportTeamValidated();
		} else {
			this.props.updateSportTeam(this.state.id, sportTeam);
			setTimeout(() => {
				if (this.props.sportTeamObject.sportTeam != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			setTimeout(() => {
				this.sportTeamList();
			}, 1500);
		}
	};

	sportTeamList = () => {
		return this.props.history.push("/sport-team/list");
	};

	sportTeamChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	sportTeamValidated = () => {
		const validated = document.querySelector("#validated");
		const nameValidated = document.querySelector("#nameValidated");
		const streetValidated = document.querySelector("#streetValidated");
		const stadiumValidated = document.querySelector("#stadiumValidated");
		const yearOfEstablishmentValidated = document.querySelector(
			"#yearOfEstablishmentValidated"
		);
		const clubColorsValidated = document.querySelector("#clubColorsValidated");
		const disciplineValidated = document.querySelector("#disciplineValidated");
		const historyValidated = document.querySelector("#historyValidated");
		const coverPhotoURLValidated = document.querySelector(
			"#coverPhotoURLValidated"
		);
		if (this.state.name.length >= 5) {
			nameValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.street.length >= 3) {
			streetValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.stadium.length >= 3) {
			stadiumValidated.setAttribute("hidden", "hidden");
		}
		if (validator.isDate(this.state.yearOfEstablishment)) {
			yearOfEstablishmentValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.clubColors.length >= 3) {
			clubColorsValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.discipline.length >= 3) {
			disciplineValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.history.length >= 10) {
			historyValidated.setAttribute("hidden", "hidden");
		}
		if (validator.isURL(this.state.coverPhotoURL)) {
			coverPhotoURLValidated.setAttribute("hidden", "hidden");
		}
		validated.removeAttribute("hidden");
	};

	sportTeamValidatedClose = () => {
		const validated = document.querySelector("#validated");
		validated.setAttribute("hidden", "hidden");
	};

	render() {
		const {
			name,
			street,
			stadium,
			yearOfEstablishment,
			clubColors,
			discipline,
			history,
			coverPhotoURL,
		} = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method === "put"
								? "Dru??yn?? sportow?? zaktualizowano poprawnie."
								: "Dru??yn?? sportow?? dodano poprawnie."
						}
						type={"success"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Card.Header>
						<FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
						{this.state.id ? "Edytuj dru??yn??" : "Dodaj now?? dru??yn??"}
					</Card.Header>
					<Form
						onReset={this.resetSportTeam}
						onSubmit={this.state.id ? this.updateSportTeam : this.saveSportTeam}
						id='sportTeamFormId'
						validated={this.state.validated}>
						<Card.Body>
							<Row>
								<Col>
									<Form.Group as={Col} controlId='formGridName'>
										<Form.Label>Nazwa dru??yny</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='name'
											value={name}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? nazw?? dru??yny sportowej'
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group as={Col} controlId='formGridYearOfEstablishment'>
										<Form.Label>Data za??o??enia</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='date'
											name='yearOfEstablishment'
											value={yearOfEstablishment}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? dat?? za??o??enia'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group as={Col} controlId='formGridStadium'>
										<Form.Label>Stadion</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='stadium'
											value={stadium}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? nazw?? stadionu'
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group as={Col} controlId='formGridStreet'>
										<Form.Label>Ulica</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='street'
											value={street}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? ulic??'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Group as={Col} controlId='formGridClubColors'>
										<Form.Label>Barwy klubowe</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='clubColors'
											value={clubColors}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? barwy klubowe'
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group as={Col} controlId='formGridDiscipline'>
										<Form.Label>Dyscyplina</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='discipline'
											value={discipline}
											onChange={this.sportTeamChange}
											className={"bg-dark text-white"}
											placeholder='Wprowad?? nazw?? dyscypliny'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridHistory'>
									<Form.Label>Historia dru??yny</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										as='textarea'
										type='textarea'
										name='history'
										value={history}
										onChange={this.sportTeamChange}
										className={"bg-dark text-white"}
										placeholder='Wprowad?? opis historii'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridCoverPhotoURL'>
									<Form.Label>Zdj??cie zespo??u</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='coverPhotoURL'
										value={coverPhotoURL}
										onChange={this.sportTeamChange}
										className={"bg-dark text-white"}
										placeholder='Wprowad?? ??cie??k?? URL zdj??cia'
									/>
								</Form.Group>
							</Row>
						</Card.Body>
						<Card.Footer style={{ textAlign: "right" }}>
							<Button size='sm' variant='success' type='submit'>
								<FontAwesomeIcon icon={faSave} />{" "}
								{this.state.id ? "Edytuj" : "Zapisz"}
							</Button>{" "}
							<Button
								size='sm'
								variant='info'
								type='reset'
								onClick={() => this.sportTeamValidatedClose()}>
								<FontAwesomeIcon icon={faUndo} /> Resetuj
							</Button>{" "}
							<Button
								size='sm'
								variant='info'
								type='button'
								onClick={() => this.sportTeamList()}>
								<FontAwesomeIcon icon={faList} /> Lista dru??yn sportowych
							</Button>
						</Card.Footer>
					</Form>
				</Card>
				<div id='validated' hidden>
					<br />
					<Alert
						variant='danger'
						onClose={() => this.sportTeamValidatedClose()}
						dismissible>
						<Alert.Heading>Zg??oszenie nie przesz??o walidacji</Alert.Heading>
						<hr />
						<div className='mb-0'>
							Aby poprawnie zapisa?? atrakcj?? turystyczn??, musi ona spe??ni??
							poni??sze warunki:
							<div id='nameValidated'>
								<li>Nazwa - musi posiada?? min. 5 znak??w</li>
								<span>Wprowadzona warto???? to - {name}</span>
							</div>
							<div id='streetValidated'>
								<li>Ulica - musi posiada?? min. 3 znaki</li>
								<span>Wprowadzona warto???? to - {street}</span>
							</div>
							<div id='stadiumValidated'>
								<li>Stadion - musi posiada?? min. 5 znak??w</li>
								<span>Wprowadzona warto???? to - {stadium}</span>
							</div>
							<div id='yearOfEstablishmentValidated'>
								<li>Rok za??o??enia - musi by?? poprawn?? dat??</li>
								<span>Wprowadzona warto???? to - {yearOfEstablishment}</span>
							</div>
							<div id='clubColorsValidated'>
								<li>Barwy klubowe - musz?? posiada?? min. 3 znaki</li>
								<span>Wprowadzona warto???? to - {clubColors}</span>
							</div>
							<div id='disciplineValidated'>
								<li>Dyscyplina - musi posiada?? min. 3 znaki</li>
								<span>Wprowadzona warto???? to - {discipline}</span>
							</div>
							<div id='historyValidated'>
								<li>Historia - musi posiada?? min. 10 znak??w</li>
								<span>Wprowadzona warto???? to - {history}</span>
							</div>
							<div id='coverPhotoURLValidated'>
								<li>Zdj??cie - musi by?? poprawnym linkiem URL</li>
								<span>Wprowadzona warto???? to - {coverPhotoURL}</span>
							</div>
						</div>
					</Alert>
				</div>
			</div>
		);
	}
}
