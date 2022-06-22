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

export default class TouristAttractionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attractions: [],
		};
	}

	componentDidMount() {
		this.findAllAttractions();

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

	findAllAttractions() {
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
					EventBus.dispatch("logout");
				}
			});
	}

	deleteTouristAttraction = (touristAttractionId) => {
		this.props.deleteTouristAttraction(touristAttractionId);
		setTimeout(() => {
			if (this.props.touristAttractionObject != null) {
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
						message={"Atrakcja turystyczna usunięta poprawnie"}
						type={"danger"}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
					<Row>
						<Col>
							<Card.Header>
								<FontAwesomeIcon icon={faList} /> Lista atrakcji turystycznych
							</Card.Header>
						</Col>
						<Col style={{ display: "flex", justifyContent: "flex-end" }}>
							<Link to={"/tourist-attraction/add"} className='btn btn-success'>
								<FontAwesomeIcon icon={faAdd} /> Dodaj nową atrakcję
							</Link>
						</Col>
					</Row>
					<Card.Body>
						<Table bordered hover striped variant='dark'>
							<thead>
								<tr>
									<th>Nazwa</th>
									<th>Osiedle</th>
									<th>Ulica</th>
									<th>Opis</th>
									<th>Zdjęcie</th>
									<th>Akcje</th>
								</tr>
							</thead>
							<tbody>
								{this.state.attractions.length === 0 ? (
									<tr align='center'>
										<td colSpan='6'>Nie ma żadnych atrakcji turystycznych.</td>
									</tr>
								) : (
									this.state.attractions.map((attraction) => (
										<tr key={attraction.id}>
											<td>{attraction.name}</td>
											<td>{attraction.estate}</td>
											<td>{attraction.street}</td>
											<td>{attraction.description}</td>
											<td>
												<img src={attraction.coverPhotoURL} height='100' />
											</td>
											<td>
												<ButtonGroup>
													<Link
														to={"/tourist-attraction/list/" + attraction.id}
														className='btn btn-sm btn-outline-primary'>
														<FontAwesomeIcon icon={faEdit} />
													</Link>{" "}
													<Button
														size='sm'
														variant='outline-danger'
														onClick={this.deleteTouristAttraction.bind(
															this,
															attraction.id
														)}>
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
