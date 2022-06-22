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

export default class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			articles: [],
		};
	}

	componentDidMount() {
		this.findAllArticles();

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

	findAllArticles() {
		axios
			.get("http://localhost:8080/auth/article/list", { headers: authHeader() })
			.then((response) => response.data)
			.then((data) => {
				this.setState({ articles: data });
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					EventBus.dispatch("logout");
				}
			});
	}

	deleteArticle = (articleId) => {
		this.props.deleteArticle(articleId);
		setTimeout(() => {
			if (this.props.articleObject != null) {
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
						message={"Artykuł usunięty poprawnie"}
						type={"danger"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Row>
						<Col>
							<Card.Header>
								<FontAwesomeIcon icon={faList} /> Lista artykułów
							</Card.Header>
						</Col>
						<Col style={{ display: "flex", justifyContent: "flex-end" }}>
							<Link to={"/article/add"} className='btn btn-success'>
								<FontAwesomeIcon icon={faAdd} /> Dodaj nowy artykuł
							</Link>
						</Col>
					</Row>
					<Card.Body>
						<Table bordered hover striped variant='dark'>
							<thead>
								<tr>
									<th>Tytuł</th>
									<th>Treść</th>
									<th>Zdjęcie</th>
									<th>Akcje</th>
								</tr>
							</thead>
							<tbody>
								{this.state.articles.length === 0 ? (
									<tr align='center'>
										<td colSpan='6'>Nie ma żadnych artykułów.</td>
									</tr>
								) : (
									this.state.articles.map((article) => (
										<tr key={article.id}>
											<td>{article.title}</td>
											<td>{article.body}</td>
											<td>
												<img src={article.coverPhotoURL} height='100' />
											</td>
											<td>
												<ButtonGroup>
													<Link
														to={"/article/list/" + article.id}
														className='btn btn-sm btn-outline-primary'>
														<FontAwesomeIcon icon={faEdit} /> Edytuj
													</Link>{" "}
													<Button
														size='sm'
														variant='outline-danger'
														onClick={this.deleteArticle.bind(this, article.id)}>
														<FontAwesomeIcon icon={faTrash} /> Usuń
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
