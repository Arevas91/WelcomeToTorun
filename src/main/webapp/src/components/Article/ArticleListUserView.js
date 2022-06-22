import React, { Component } from "react";
import "../../../src/index.css";
import AuthService from "../../services/Auth/AuthService";

import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/Auth/AuthHeader";
import EventBus from "../Main/EventBus";

export default class ArticleListUserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
		};
	}

	componentDidMount = () => {
		this.findAllArticles();

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

	findAllArticles = () => {
		axios
			.get("http://localhost:8080/auth/article/list", { headers: authHeader() })
			.then((response) => response.data)
			.then((data) => {
				this.setState({ articles: data });
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
						{this.state.articles.map((article, index) => (
							<Col sm key={index} align='center' className='leading'>
								<Card style={{ width: "18rem" }}>
									<Card.Img
										variant='top'
										src={article.coverPhotoURL}
										height='150px'
									/>
									<Card.Body>
										<Card.Title className='shortText'>
											{article.title}
										</Card.Title>
										<Card.Text className='shortText'>{article.body}</Card.Text>
										<Link to={"list/" + article.id} className='btn btn-info'>
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
