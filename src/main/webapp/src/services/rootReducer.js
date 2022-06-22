import { combineReducers } from "redux";
import { articleReducer } from "./Article/ArticleReducer";
import { touristAttractionReducer } from "./Attractions/TouristAttractionReducer";
import { sportTeamReducer } from "./Team/SportTeamReducer";
import { ratingReducer } from "./Rating/RatingReducer";
import { authReducer } from "./Auth/AuthReducer";
import { messageReducer } from "./Auth/MessageReducer";

export const rootReducer = combineReducers({
	article: articleReducer,
	touristAttraction: touristAttractionReducer,
	sportTeam: sportTeamReducer,
	rating: ratingReducer,
	auth: authReducer,
	message: messageReducer,
});
