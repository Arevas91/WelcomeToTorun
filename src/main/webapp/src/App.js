import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import NavigationBar from "./containers/Main/NavigationBar";
import Footer from "./components/Main/Footer";
import Home from "./components/Main/Home";
import ArticleList from "./containers/Article/ArticleList";
import Article from "./containers/Article/Article";
import ArticleListUserView from "./components/Article/ArticleListUserView";
import ArticleUserView from "./containers/Article/ArticleUserView";
import TouristAttractionList from "./containers/Attraction/TouristAttractionList";
import TouristAttraction from "./containers/Attraction/TouristAttraction";
import TouristAttractionListUserView from "./components/Attraction/TouristAttractionListUserView";
import TouristAttractionUserView from "./containers/Attraction/TouristAttractionUserView";
import SportTeamList from "./containers/Team/SportTeamList";
import SportTeam from "./containers/Team/SportTeam";
import SportTeamListUserView from "./components/SportTeam/SportTeamListUserView";
import SportTeamUserView from "./containers/Team/SportTeamUserView";
import Login from "./containers/Main/Login";
import Register from "./containers/Main/Register";

const App = () => {

	return (
		<Router>
			<NavigationBar />
			<Container>
				<Row>
					<Col lg={12} className={"margin-top"}>
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/article/list' exact component={ArticleList} />
							<Route path='/article/add' exact component={Article} />
							<Route path='/article/list/:id' exact component={Article} />
							<Route path='/user/article/list' exact component={ArticleListUserView} />
							<Route path='/user/article/list/:id' exact component={ArticleUserView}/>
							<Route path='/tourist-attraction/list' exact component={TouristAttractionList}/>
							<Route path='/tourist-attraction/add' exact component={TouristAttraction}/>
							<Route path='/user/tourist-attraction/list' exact component={TouristAttractionListUserView} />
							<Route path='/user/tourist-attraction/list/:id' exact component={TouristAttractionUserView}/>
							<Route path='/tourist-attraction/list/:id' exact component={TouristAttraction}/>
							<Route path='/sport-team/list' exact component={SportTeamList} />
							<Route path='/sport-team/add' exact component={SportTeam}/>
							<Route path='/sport-team/list/:id' exact component={SportTeam}/>
							<Route path='/user/sport-team/list' exact component={SportTeamListUserView} />
							<Route path='/user/sport-team/list/:id' exact component={SportTeamUserView}/>
							<Route path="/login" exact component={Login} />
              				<Route path="/register" exact component={Register} />
						</Switch>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Router>
	);
};

export default App;