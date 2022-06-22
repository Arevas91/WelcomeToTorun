import React, { Component } from "react";
import "../../../src/index.css";

import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/Auth/AuthHeader";
import EventBus from "../Main/EventBus";
import AuthService from "../../services/Auth/AuthService";

export default class TouristAttractionListUserView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attractions: [],
		};
	}

	componentDidMount = () => {
		this.findAllTouristAttractions();

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

	findAllTouristAttractions = () => {
		axios
			.get("http://localhost:8080/auth/tourist-attraction/list", {
				headers: authHeader(),
			})
			.then((response) => response.data)
			.then((data) => {
				this.setState({ attractions: data });
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
						{this.state.attractions.map((attraction, index) => (
							<Col sm key={index} align='center' className='leading'>
								<Card style={{ width: "18rem" }}>
									<Card.Img
										variant='top'
										src={attraction.coverPhotoURL}
										height='150px'
									/>
									<Card.Body>
										<Card.Title className='shortText'>
											{attraction.name}
										</Card.Title>
										<Card.Text className='shortText'>
											{attraction.description}
										</Card.Text>
										<Link to={"list/" + attraction.id} className='btn btn-info'>
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
