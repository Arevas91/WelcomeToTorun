import React, { Component } from "react";

import { Card, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../../../src/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import authHeader from "../../services/Auth/AuthHeader";
import AuthService from "../../services/Auth/AuthService";
import EventBus from "../Main/EventBus";

export default class SportUserUserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ratings: [],
			average: "",
		};
	}

	componentDidMount = () => {
		const sportTeamId = +this.props.match.params.id;
		if (sportTeamId) {
			this.findSportTeamById(sportTeamId);
			this.findRatingBySportTeamID(sportTeamId);
			this.findAverageRatingBySportTeamID(sportTeamId);
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
		}, 100);
	};

	findRatingBySportTeamID = (sportTeamId) => {
		this.props.fetchSportTeamRating(sportTeamId);
		setTimeout(() => {
			let rating = this.props.ratingObject.rating;
			if (rating != null) {
				this.setState({
					ratings: rating,
				});
			}
		}, 100);
	};

	findAverageRatingBySportTeamID = (sportTeamId) => {
		axios
			.get(
				"http://localhost:8080/auth/rating/list/average-rating/sport-team/" +
					sportTeamId,
				{ headers: authHeader() }
			)
			.then((response) => response.data)
			.then((data) => {
				this.setState({
					average: data,
				});
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					if (error.response && error.response.status === 401) {
						EventBus.dispatch("logout");
					}
				}
			});
	};

	submitRating = (event) => {
		event.preventDefault();

		let rate;
		if (this.state.rating) {
			rate = this.state.rating;
		} else {
			rate = 1;
		}

		const rating = {
			rating: rate,
			description: this.state.description,
		};

		const sportTeamId = +this.props.match.params.id;
		this.props.saveSportTeamRating(sportTeamId, rating);

		setTimeout(() => {
			window.location.reload(true);
		}, 100);
	};

	ratingChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	pdfReport = (sportTeamId) => {
		axios({
			url: "http://localhost:8080/auth/sport-team/pdf/report/" + sportTeamId,
			method: "GET",
			responseType: "blob",
			headers: authHeader(),
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				"Welcome_to_torun-sport_team_" + sportTeamId + ".pdf"
			);
			document.body.appendChild(link);
			link.click();
		});
	};

	render() {
		const {
			id,
			name,
			stadium,
			street,
			yearOfEstablishment,
			clubColors,
			discipline,
			history,
			description,
			coverPhotoURL,
			rating,
		} = this.state;

		let average;
		if (+this.state.average) {
			average = "Średnia ocena atrakcji: " + (+this.state.average).toFixed(2);
		} else {
			average =
				"Ten klub nie ma jeszcze oceny. Zostaw komentarz i bądź pierwszy!";
		}

		return (
			<>
				<div className='singlePost'>
					<Card className='text-center' style={{ width: "50rem" }}>
						<Card.Header>
							<Card.Img src={coverPhotoURL} height='450px' />
						</Card.Header>
						<Card.Body>
							<Card.Title>
								{name} - {discipline}
							</Card.Title>
							<Card.Text>{history}</Card.Text>
							<div>
								<Card.Title>Dane szczegółowe:</Card.Title>
								<Row>
									<Col>
										<Card.Text>Stadion: {stadium}</Card.Text>
									</Col>
									<Col>
										<Card.Text>Ulica: {street}</Card.Text>
									</Col>
								</Row>
								<Row>
									<Col>
										<Card.Text>Data założenia: {yearOfEstablishment}</Card.Text>
									</Col>
									<Col>
										<Card.Text>Barwy klubowe: {clubColors}</Card.Text>
									</Col>
								</Row>
							</div>
							<div className='pdfButton'>
								<Button
									variant='success'
									type='submit'
									onClick={() => this.pdfReport(id)}>
									<FontAwesomeIcon icon={faFilePdf} /> Pobierz w PDF
								</Button>
							</div>
						</Card.Body>
						<Card.Footer className='text-muted'>{average}</Card.Footer>
					</Card>
				</div>

				<div className='singlePost'>
					<Card className='text-center' style={{ width: "50rem" }}>
						<Form onSubmit={this.submitRating}>
							<Card.Title>Wprowadź komentarz</Card.Title>
							<Row>
								<Col>
									<Form.Group className='mb-3' controlId='formBasicDescription'>
										<Form.Label>Treść komentarza</Form.Label>
										<Form.Control
											as='textarea'
											type='text'
											name='description'
											value={description}
											onChange={this.ratingChange}
											placeholder='Wprowadź treść'
										/>
									</Form.Group>
								</Col>
								<Col xs lg='2'>
									<Form.Group className='mb-3' controlId='formBasicRating'>
										<Form.Label>Ocena</Form.Label>
										<Form.Control
											as='select'
											type='number'
											name='rating'
											value={rating}
											onChange={this.ratingChange}
											placeholder='Ocena'>
											<option value={1}>1</option>
											<option value={2}>2</option>
											<option value={3}>3</option>
											<option value={4}>4</option>
											<option value={5}>5</option>
											<option value={6}>6</option>
											<option value={7}>7</option>
											<option value={8}>8</option>
											<option value={9}>9</option>
											<option value={10}>10</option>
										</Form.Control>
									</Form.Group>
								</Col>
							</Row>
							<Button variant='primary' type='submit'>
								Wyślij
							</Button>
						</Form>
					</Card>
				</div>

				<div className='singlePost'>
					<Card className='text-center' style={{ width: "50rem" }}>
						<Card.Body>
							{this.state.ratings.map((rating, index) => (
								<Row key={index}>
									<Col>
										<Card.Title
											style={{ display: "flex", justifyContent: "flex-start" }}>
											Komentarz: {index + 1}
										</Card.Title>
									</Col>
									<Col>
										<Card.Title
											style={{ display: "flex", justifyContent: "flex-end" }}>
											Ocena: {rating.rating}
										</Card.Title>
									</Col>
									<Card.Text>{rating.description}</Card.Text>
									<hr />
								</Row>
							))}
						</Card.Body>
					</Card>
				</div>
			</>
		);
	}
}
