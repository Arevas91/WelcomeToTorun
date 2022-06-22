import React, { Component } from "react";

import { Card, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../../../src/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import authHeader from "../../services/Auth/AuthHeader";
import AuthService from "../../services/Auth/AuthService";
import EventBus from "../Main/EventBus";

export default class ArticleUserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ratings: [],
			average: "",
		};
	}

	componentDidMount = () => {
		const articleId = +this.props.match.params.id;
		if (articleId) {
			this.findArticleById(articleId);
			this.findRatingByArticleID(articleId);
			this.findAverageRatingByArticleID(articleId);
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

	findArticleById = (articleId) => {
		this.props.fetchArticle(articleId);
		setTimeout(() => {
			let article = this.props.articleObject.article;
			if (article != null) {
				this.setState({
					id: article.id,
					title: article.title,
					body: article.body,
					coverPhotoURL: article.coverPhotoURL,
				});
			}
		}, 100);
	};

	findRatingByArticleID = (articleId) => {
		this.props.fetchArticeRating(articleId);
		setTimeout(() => {
			let rating = this.props.ratingObject.rating;
			if (rating != null) {
				this.setState({
					ratings: rating,
				});
			}
		}, 100);
	};

	findAverageRatingByArticleID = (articleId) => {
		axios
			.get(
				"http://localhost:8080/auth/rating/list/average-rating/article/" +
					articleId,
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

		const articleId = +this.props.match.params.id;
		this.props.saveArticleRating(articleId, rating);

		setTimeout(() => {
			window.location.reload(true);
		}, 100);
	};

	ratingChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	pdfReport = (articleId) => {
		axios({
			url: "http://localhost:8080/auth/article/pdf/report/" + articleId,
			method: "GET",
			responseType: "blob",
			headers: authHeader(),
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				"Welcome_to_torun-article_" + articleId + ".pdf"
			);
			document.body.appendChild(link);
			link.click();
		});
	};

	render() {
		const { id, title, body, coverPhotoURL, description, rating } = this.state;

		let average;
		if (+this.state.average) {
			average = "Średnia ocena artykułu: " + (+this.state.average).toFixed(2);
		} else {
			average =
				"Ten artykuł nie ma jeszcze oceny. Zostaw komentarz i bądź pierwszy!";
		}

		return (
			<>
				<div className='singlePost'>
					<Card className='text-center' style={{ width: "50rem" }}>
						<Card.Header>
							<Card.Img src={coverPhotoURL} height='450px' />
						</Card.Header>
						<Card.Body>
							<Card.Title>{title}</Card.Title>
							<Card.Text>{body}</Card.Text>
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
