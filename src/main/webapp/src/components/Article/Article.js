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

export default class Article extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
	}

	initialState = {
		id: "",
		title: "",
		body: "",
		coverPhotoURL: "",
	};

	resetArticle = () => {
		this.setState(() => this.initialState);
	};

	componentDidMount() {
		const articleId = +this.props.match.params.id;
		if (articleId) {
			this.findArticleById(articleId);
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
		}, 1000);
	};

	saveArticle = (event) => {
		event.preventDefault();

		const article = {
			title: this.state.title,
			body: this.state.body,
			coverPhotoURL: this.state.coverPhotoURL,
		};

		if (
			article.title.length < 10 ||
			article.body.length < 10 ||
			!validator.isURL(article.coverPhotoURL)
		) {
			this.articleValited();
		} else {
			this.articleValitedClose();
			this.props.saveArticle(article);
			setTimeout(() => {
				if (this.props.articleObject.article != null) {
					this.setState({ show: true, method: "post" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			this.setState(this.initialState);
		}
	};

	updateArticle = (event) => {
		event.preventDefault();

		const article = {
			id: this.state.id,
			title: this.state.title,
			body: this.state.body,
			coverPhotoURL: this.state.coverPhotoURL,
		};

		if (
			article.title.length < 10 ||
			article.body.length < 10 ||
			!validator.isURL(article.coverPhotoURL)
		) {
			this.articleValited();
		} else {
			this.props.updateArticle(this.state.id, article);
			setTimeout(() => {
				if (this.props.articleObject.article != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			}, 500);

			setTimeout(() => {
				this.articleList();
			}, 1500);
		}
	};

	articleList = () => {
		return this.props.history.push("/article/list");
	};

	articleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	articleValited = () => {
		const validated = document.querySelector("#validated");
		const titleValidated = document.querySelector("#titleValidated");
		const bodyValidated = document.querySelector("#bodyValidated");
		const coverPhotoURLValidated = document.querySelector(
			"#coverPhotoURLValidated"
		);
		if (this.state.title.length >= 10) {
			titleValidated.setAttribute("hidden", "hidden");
		}
		if (this.state.body.length >= 10) {
			bodyValidated.setAttribute("hidden", "hidden");
		}
		if (validator.isURL(this.state.coverPhotoURL)) {
			coverPhotoURLValidated.setAttribute("hidden", "hidden");
		}
		validated.removeAttribute("hidden");
	};

	articleValitedClose = () => {
		const validated = document.querySelector("#validated");
		validated.setAttribute("hidden", "hidden");
	};

	render() {
		const { title, body, coverPhotoURL } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method === "put"
								? "Artyku?? zaktualizowano poprawnie."
								: "Artyku?? dodano poprawnie."
						}
						type={"success"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Card.Header>
						<FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
						{this.state.id ? "Edytuj artyku??" : "Dodaj nowy artyku??"}
					</Card.Header>
					<Form
						onReset={this.resetArticle}
						onSubmit={this.state.id ? this.updateArticle : this.saveArticle}
						id='articleFormId'
						validated={this.state.validated}>
						<Card.Body>
							<Row>
								<Form.Group as={Col} controlId='formGridTitle'>
									<Form.Label>Tytu?? artyku??u</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='title'
										value={title}
										onChange={this.articleChange}
										className={"bg-dark text-white"}
										placeholder='Wprowad?? tytu?? artyku??u'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridBody'>
									<Form.Label>Tre???? artyku??u</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										as='textarea'
										type='textarea'
										name='body'
										value={body}
										onChange={this.articleChange}
										className={"bg-dark text-white"}
										placeholder='Wprowad?? tre???? artyku??u'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridCoverPhotoURL'>
									<Form.Label>Zdj??cie artyku??u</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='coverPhotoURL'
										value={coverPhotoURL}
										onChange={this.articleChange}
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
								onClick={() => this.articleValitedClose()}>
								<FontAwesomeIcon icon={faUndo} /> Resetuj
							</Button>{" "}
							<Button
								size='sm'
								variant='info'
								type='button'
								onClick={() => this.articleList()}>
								<FontAwesomeIcon icon={faList} /> Lista artyku????w
							</Button>
						</Card.Footer>
					</Form>
				</Card>
				<div id='validated' hidden>
					<br />
					<Alert
						variant='danger'
						onClose={() => this.articleValitedClose()}
						dismissible>
						<Alert.Heading>Zg??oszenie nie przesz??o walidacji</Alert.Heading>
						<hr />
						<div className='mb-0'>
							Aby poprawnie zapisa?? artyku??, musi on spe??ni?? poni??sze warunki:
							<div id='titleValidated'>
								<li>Tytu?? - musi posiada?? min. 10 znak??w</li>
								<span>Wprowadzona warto???? to - {title}</span>
							</div>
							<div id='bodyValidated'>
								<li>Tre???? - musi posiada?? min. 10 znak??w</li>
								<span>Wprowadzona warto???? to - {body}</span>
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
