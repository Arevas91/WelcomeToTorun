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

export default class TouristAttraction extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
	}

	initialState = {
		id: "",
		name: "",
		estate: "",
		street: "",
		description: "",
		coverPhotoURL: "",
	};

	resetTouristAttraction = () => {
		this.setState(() => this.initialState);
	};

	componentDidMount() {
		const touristAttractionId = +this.props.match.params.id;
		if (touristAttractionId) {
			this.findTouristAttractionById(touristAttractionId);
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

	findTouristAttractionById = (touristAttractionId) => {
		this.props.fetchTouristAttraction(touristAttractionId);
		setTimeout(() => {
			let touristAttraction =
				this.props.touristAttractionObject.touristAttraction;
			if (touristAttraction != null) {
				this.setState({
					id: touristAttraction.id,
					name: touristAttraction.name,
					estate: touristAttraction.estate,
					street: touristAttraction.street,
					description: touristAttraction.description,
					coverPhotoURL: touristAttraction.coverPhotoURL,
				});
			}
		}, 1000);
	};

	saveTouristAttraciotn = (event) => {
		event.preventDefault();

		const touristAttraction = {
			name: this.state.name,
			estate: this.state.estate,
			street: this.state.street,
			description: this.state.description,
			coverPhotoURL: this.state.coverPhotoURL,
		};

		if (
			touristAttraction.name.length < 5 ||
			touristAttraction.estate.length < 3 ||
			touristAttraction.street.length < 3 ||
			touristAttraction.description.length < 10 ||
			!validator.isURL(touristAttraction.coverPhotoURL)
		) {
			this.touristAttractionValidated();
		} else {
			this.touristAttractionValidatedClose();
			this.props.saveTouristAttraction(touristAttraction);
			setTimeout(() => {
				if (this.props.touristAttractionObject.touristAttraction != null) {
					this.setState({ show: true, method: "post" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			this.setState(this.initialState);
		}
	};

	updateTouristAttraction = (event) => {
		event.preventDefault();

		const touristAttraction = {
			name: this.state.name,
			estate: this.state.estate,
			street: this.state.street,
			description: this.state.description,
			coverPhotoURL: this.state.coverPhotoURL,
		};

		if (
			touristAttraction.name.length < 5 ||
			touristAttraction.estate.length < 3 ||
			touristAttraction.street.length < 3 ||
			touristAttraction.description.length < 10 ||
			!validator.isURL(touristAttraction.coverPhotoURL)
		) {
			this.touristAttractionValidated();
		} else {
			this.props.updateTouristAttraction(this.state.id, touristAttraction);
			setTimeout(() => {
				if (this.props.touristAttractionObject.touristAttraction != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			setTimeout(() => {
				this.touristAttractionList();
			}, 1500);
		}
	};

	touristAttractionList = () => {
		return this.props.history.push("/tourist-attraction/list");
	};

	touristAttractionChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	touristAttractionValidated = () => {
		const validated = document.querySelector("#validated");
		const nameValidated = document.querySelector("#nameValidated");
		const estateValidated = document.querySelector("#estateValidated");
		const streetValidated = document.querySelector("#streetValidated");
		const descriptionValidated = document.querySelector(
			"#descriptionValidated"
		);
		const coverPhotoURLValidated = document.querySelector(
			"#coverPhotoURLValidated"
		);
		if (this.state.name.length >= 5) {
			nameValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.estate.length >= 3) {
			estateValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.street.length >= 3) {
			streetValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.description.length >= 10) {
			descriptionValidated.setAttribute("hidden", "hidden");
		}
		if (validator.isURL(this.state.coverPhotoURL)) {
			coverPhotoURLValidated.setAttribute("hidden", "hidden");
		}
		validated.removeAttribute("hidden");
	};

	touristAttractionValidatedClose = () => {
		const validated = document.querySelector("#validated");
		validated.setAttribute("hidden", "hidden");
	};

	render() {
		const { name, estate, street, description, coverPhotoURL } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method === "put"
								? "Atrakcję turystyczną zaktualizowano poprawnie."
								: "Atrakcję turystyczną dodano poprawnie."
						}
						type={"success"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Card.Header>
						<FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
						{this.state.id ? "Edytuj atrakcję" : "Dodaj nową atrakcję"}
					</Card.Header>
					<Form
						onReset={this.resetTouristAttraction}
						onSubmit={
							this.state.id
								? this.updateTouristAttraction
								: this.saveTouristAttraciotn
						}
						id='touristAttractionFormId'
						validated={this.state.validated}>
						<Card.Body>
							<Row>
								<Form.Group as={Col} controlId='formGridName'>
									<Form.Label>Nazwa atrakcji</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='name'
										value={name}
										onChange={this.touristAttractionChange}
										className={"bg-dark text-white"}
										placeholder='Wprowadź nazwę atrakcji turystycznej'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Col>
									<Form.Group as={Col} controlId='formGridEstate'>
										<Form.Label>Osiedle</Form.Label>
										<Form.Control
											required
											autoComplete='off'
											type='text'
											name='estate'
											value={estate}
											onChange={this.touristAttractionChange}
											className={"bg-dark text-white"}
											placeholder='Wprowadź osiedle'
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
											onChange={this.touristAttractionChange}
											className={"bg-dark text-white"}
											placeholder='Wprowadź ulicę'
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridDescription'>
									<Form.Label>Opis atrakcji</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										as='textarea'
										type='textarea'
										name='description'
										value={description}
										onChange={this.touristAttractionChange}
										className={"bg-dark text-white"}
										placeholder='Wprowadź opis atrakcji'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridCoverPhotoURL'>
									<Form.Label>Zdjęcie atrakcji</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='coverPhotoURL'
										value={coverPhotoURL}
										onChange={this.touristAttractionChange}
										className={"bg-dark text-white"}
										placeholder='Wprowadź ścieżkę URL zdjęcia'
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
								onClick={() => this.touristAttractionValidatedClose()}>
								<FontAwesomeIcon icon={faUndo} /> Resetuj
							</Button>{" "}
							<Button
								size='sm'
								variant='info'
								type='button'
								onClick={() => this.touristAttractionList()}>
								<FontAwesomeIcon icon={faList} /> Lista atrakcji turystycznych
							</Button>
						</Card.Footer>
					</Form>
				</Card>
				<div id='validated' hidden>
					<br />
					<Alert
						variant='danger'
						onClose={() => this.touristAttractionValidatedClose()}
						dismissible>
						<Alert.Heading>Zgłoszenie nie przeszło walidacji</Alert.Heading>
						<hr />
						<div className='mb-0'>
							Aby poprawnie zapisać atrakcję turystyczną, musi ona spełnić
							poniższe warunki:
							<div id='nameValidated'>
								<li>Nazwa - musi posiadać min. 5 znaków</li>
								<span>Wprowadzona wartość to - {name}</span>
							</div>
							<div id='estateValidated'>
								<li>Osiedle - musi posiadać min. 3 znaki</li>
								<span>Wprowadzona wartość to - {estate}</span>
							</div>
							<div id='streetValidated'>
								<li>Ulica - musi posiadać min. 3 znaki</li>
								<span>Wprowadzona wartość to - {street}</span>
							</div>
							<div id='descriptionValidated'>
								<li>Treść - musi posiadać min. 10 znaków</li>
								<span>Wprowadzona wartość to - {description}</span>
							</div>
							<div id='coverPhotoURLValidated'>
								<li>Zdjęcie - musi być poprawnym linkiem URL</li>
								<span>Wprowadzona wartość to - {coverPhotoURL}</span>
							</div>
						</div>
					</Alert>
				</div>
			</div>
		);
	}
}
