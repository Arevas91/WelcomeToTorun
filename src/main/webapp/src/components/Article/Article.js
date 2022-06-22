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
								? "Artykuł zaktualizowano poprawnie."
								: "Artykuł dodano poprawnie."
						}
						type={"success"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Card.Header>
						<FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
						{this.state.id ? "Edytuj artykuł" : "Dodaj nowy artykuł"}
					</Card.Header>
					<Form
						onReset={this.resetArticle}
						onSubmit={this.state.id ? this.updateArticle : this.saveArticle}
						id='articleFormId'
						validated={this.state.validated}>
						<Card.Body>
							<Row>
								<Form.Group as={Col} controlId='formGridTitle'>
									<Form.Label>Tytuł artykułu</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='title'
										value={title}
										onChange={this.articleChange}
										className={"bg-dark text-white"}
										placeholder='Wprowadź tytuł artykułu'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridBody'>
									<Form.Label>Treść artykułu</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										as='textarea'
										type='textarea'
										name='body'
										value={body}
										onChange={this.articleChange}
										className={"bg-dark text-white"}
										placeholder='Wprowadź treść artykułu'
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId='formGridCoverPhotoURL'>
									<Form.Label>Zdjęcie artykułu</Form.Label>
									<Form.Control
										required
										autoComplete='off'
										type='text'
										name='coverPhotoURL'
										value={coverPhotoURL}
										onChange={this.articleChange}
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
								onClick={() => this.articleValitedClose()}>
								<FontAwesomeIcon icon={faUndo} /> Resetuj
							</Button>{" "}
							<Button
								size='sm'
								variant='info'
								type='button'
								onClick={() => this.articleList()}>
								<FontAwesomeIcon icon={faList} /> Lista artykułów
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
						<Alert.Heading>Zgłoszenie nie przeszło walidacji</Alert.Heading>
						<hr />
						<div className='mb-0'>
							Aby poprawnie zapisać artykuł, musi on spełnić poniższe warunki:
							<div id='titleValidated'>
								<li>Tytuł - musi posiadać min. 10 znaków</li>
								<span>Wprowadzona wartość to - {title}</span>
							</div>
							<div id='bodyValidated'>
								<li>Treść - musi posiadać min. 10 znaków</li>
								<span>Wprowadzona wartość to - {body}</span>
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
