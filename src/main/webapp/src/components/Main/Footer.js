import React, { useState, useEffect } from "react";

import { Navbar, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faGithub,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	const [fullYear, setFullYear] = useState();

	useEffect(() => {
		setFullYear(new Date().getFullYear());
	}, [fullYear]);

	return (
		<div style={{ padding: "35px" }}>
			<Navbar fixed='bottom' bg='dark' variant='dark'>
				<Container>
					<Col lg={12} className='text-center text-muted'>
						<div>
							<a href='https://www.facebook.com/piotr.dzikowski.581/'>
								<FontAwesomeIcon icon={faFacebook} />
							</a>{" "}
							<a href='https://github.com/Arevas91'>
								<FontAwesomeIcon icon={faGithub} />
							</a>{" "}
							<a href='https://www.linkedin.com/in/piotr-dzikowski/'>
								<FontAwesomeIcon icon={faLinkedin} />{" "}
							</a>
						</div>
						<div>
							{fullYear}-{fullYear + 1}, Witaj w Toruniu! Arevas91
						</div>
					</Col>
				</Container>
			</Navbar>
		</div>
	);
};

export default Footer;
