import { BASE_URL } from "../Constants";
import jwt from 'jwt-decode'

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

function threadFacade() {

	const getAllThreads = () => {
		const options = makeOptions("GET", false);
		return fetch(BASE_URL + "/ForumThread", options).then(handleHttpErrors);
	}

	const createUser = (user, password) => {
		const options = makeOptions("POST", true, {
			Username: user,
			Password: password,
		});
		return fetch(BASE_URL + "/User", options)
			.then(handleHttpErrors);
	}

	const fetchData = () => {
		const options = makeOptions("GET", true); //True add's the token

		if (getRoles() === "user") {
			return fetch(BASE_URL + "/api/info/user", options).then(handleHttpErrors);
		} else if (getRoles() === "admin") {
			return fetch(BASE_URL + "/api/info/admin", options).then(handleHttpErrors);
		}
	};

	const makeOptions = (method, addToken, body) => {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	return {
		makeOptions,
		getAllThreads,
		createUser,
		fetchData,
	};
}

const facade = threadFacade();
export default facade;
