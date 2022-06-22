import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
	login(username, password) {
		return axios
			.post(API_URL + "signin", { username, password })
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
					localStorage["firstLoad"] = true;
				}
				return response.data;
			});
	}

	logout() {
		localStorage.removeItem("user");
		localStorage.removeItem("firstLoad");
		setTimeout(() => {
			window.location.reload(true);
		}, 100);
	}

	register(username, email, password) {
		return axios.post(API_URL + "signup", {
			username,
			email,
			password,
		});
	}
}

export default new AuthService();
