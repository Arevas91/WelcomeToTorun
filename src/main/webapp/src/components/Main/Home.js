import React, { Component } from "react";

import { Carousel, Col, Row, Container, Card } from "react-bootstrap";
import axios from "axios";
import "../../../src/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDown,
	faDroplet,
	faWind,
} from "@fortawesome/free-solid-svg-icons";

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	initialState = {
		city: "",
		temp: "",
		pressure: "",
		humidity: "",
		wind: "",
		weatherIcon: "",
	};

	componentDidMount() {
		this.weatherBox();
	}

	weatherBox = () => {
		axios
			.get(
				`http://api.weatherapi.com/v1/forecast.json?key=1622e0e3a0704680a8e171032221601&q=toruń`
			)
			.then((response) => response.data)
			.then((data) => {
				if (!data.error) {
					this.setState({
						city: data.location.name,
						temp: data.current.temp_c,
						pressure: data.current.pressure_mb + " hPa",
						humidity: data.current.humidity + "%",
						wind: data.current.wind_kph + " km/h",
						weatherIcon: data.current.condition.icon,
					});
				}
			});
	};

	render() {
		const { city, temp, pressure, humidity, wind, weatherIcon } = this.state;

		return (
			<>
				<Container>
					<Row>
						<Col>
							<Card className='homeTextBorder'>
								<div className='homeText'>
									„Toruń ozdobnymi budowlami i pokryciem ceglanych dachówek tak
									cudownie jaśnieje, że niewiele miast może mu dorównać
									pięknością i wspaniałością”. Tak o Toruniu, w XV wieku, pisał
									polski kronikarz Jan Długosz. Miasto to powstało w XIII wieku,
									a jego założycielami byli rycerze spod znaku czarnego krzyża.
									Trzeba tu jednak zaznaczyć, że pierwotnie Toruń położony był w
									innym miejscu. Przyczyną przeniesienia Torunia, podając za
									głosem krzyżackiej kroniki, były ustawiczne przybory wód. W
									krótkim czasie, w nowym miejscu, wyrosły dwa miasta: Stare i
									Nowe, a pomiędzy nimi Krzyżacy wnieśli swój zamek.
								</div>
							</Card>
						</Col>
						<Col>
							<Card body>
								<div align='center'>
									<div className='weather'>
										<div className='weather__icon'>
											<img src={weatherIcon} />
										</div>

										<div className='weather__info'>
											<div className='city'>
												<span>{city}</span>{" "}
											</div>
											<div className='temperature'>
												<span>{temp}</span>&deg;C
											</div>
										</div>

										<ul className='weather__details'>
											<li>
												<FontAwesomeIcon icon={faArrowDown} />{" "}
												<span>{pressure}</span>
											</li>
											<li>
												<FontAwesomeIcon icon={faDroplet} />{" "}
												<span>{humidity}</span>
											</li>
											<li>
												<FontAwesomeIcon icon={faWind} /> <span>{wind}</span>
											</li>
										</ul>
									</div>
								</div>
							</Card>
						</Col>
					</Row>
				</Container>
				<br />
				<Container>
					<Row>
						<Col>
							<Carousel>
								<Carousel.Item interval={2000}>
									<img
										className='d-block w-100'
										src='https://cdn.pixabay.com/photo/2018/09/29/09/33/torun-3711031__340.jpg'
										alt='Pierwsze zdjęcie Torunia'
									/>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img
										className='d-block w-100'
										src='https://cdn.pixabay.com/photo/2020/02/17/21/47/torun-4857967__340.jpg'
										alt='Drugie zdjęcie Torunia'
									/>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img
										className='d-block w-100'
										src='https://cdn.pixabay.com/photo/2020/02/08/10/01/torun-4829622__340.jpg'
										alt='Trzecie zdjęcie Torunia'
									/>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img
										className='d-block w-100'
										src='https://cdn.pixabay.com/photo/2020/02/08/09/56/church-4829609__340.jpg'
										alt='Czwarte zdjęcie Torunia'
									/>
								</Carousel.Item>
								<Carousel.Item interval={2000}>
									<img
										className='d-block w-100'
										src='https://cdn.pixabay.com/photo/2020/01/15/22/18/torun-4769058__340.jpg'
										alt='Piąte zdjęcie Torunia'
									/>
								</Carousel.Item>
							</Carousel>
						</Col>
						<Col>
							<Card className='homeTextBorder'>
								<div className='homeText'>
								Jedna z dwóch stolic województwa kujawsko-pomorskiego z wpisanym na listę światowego dziedzictwa UNESCO średniowiecznym zespołem miejskim, stanowi jeden z najważniejszych kulturowo-turystycznych ośrodków w Polsce... <br/><br/>
								
								W Toruniu doszło do podpisania dwóch traktatów pokojowych kończących wojny polsko-krzyżackie w 1411 i 1466 r. Postanowieniem tego drugiego, Toruń stał się miastem położonym w Królestwie Polskim. Oddajmy głos kronikarzowi: „W niedzielę, dnia dziewiętnastego października, po spełnieniu i zatwierdzeniu ugody wieczystego pokoju, której warunki i opisy przez dni kilka układano, (...) przybyli osobiście do giełdy toruńskiej król Kazimierz i mistrz Ludwik z licznym panów orszakiem. Gdy się obadwaj wzajemnie i po przyjacielsku powitali, nakazano milczenie, a Rudolf, legat apostolski, ogłosił w całej osnowie umowę wieczystego pokoju między Kazimierzem, królem polskim, i jego królestwem z jednej strony, a Ludwikiem, mistrzem pruskim, i Zakonem z drugiej strony, szczęśliwie zawartego, (...)” [źródło: Jan Długosz, Roczniki…].<br/><br/>

								Odkryj Toruń razem z nami. Zaloguj się, aby poznać więcej informacji na temat atrakcji i codziennego życia mieszczańców.
								</div>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
