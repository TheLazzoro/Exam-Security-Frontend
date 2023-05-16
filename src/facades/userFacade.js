import { BASE_URL } from "../Constants";
import jwt from 'jwt-decode'

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

function userFacade() {
	const setToken = (token) => {
		localStorage.setItem("jwtToken", token);
	};

	const getToken = () => {
		return localStorage.getItem("jwtToken");
	};

	const getRoles = () => {
		return jwt(getToken()).role;
	}

	const getName = () => {
		return jwt(getToken()).username;
	}

	const loggedIn = () => {
		const loggedIn = getToken() != null;
		return loggedIn;
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
	};

	const login = (user, password) => {
		const options = makeOptions("POST", true, {
			username: user,
			password: password,
		});
		return fetch(BASE_URL + "/Login", options)
			.then(handleHttpErrors)
			.then((res) => {
				setToken(res.token);
			});
	};

	const isTokenValid = () => {
		const options = makeOptions("GET", true); //True add's the token
		return fetch(BASE_URL + "/User", options);
	}

	const adminExists = () => {
		const options = makeOptions("GET", true); //True add's the token
		return fetch(BASE_URL + "/api/info/all", options).then(handleHttpErrors);
	}

	const getUserImage = async (id) => {
		const response = await fetch(BASE_URL + "/User/Image-Get/" + id);
		return response.blob();
	}

	const createUser = (user, password) => {
		const options = makeOptions("POST", true, {
			Username: user,
			Password: password,
		});
		return fetch(BASE_URL + "/User", options)
			.then(handleHttpErrors);
	}

	const uploadImage = (image) => {
		const options = makeOptions_FormData("POST", true, image);
		console.log(options);
		return fetch(BASE_URL + "/User/Image-Upload", options)
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
			const token = getToken();
			opts.headers["Authorization"] = 'Bearer ' + token;
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	const makeOptions_FormData = (method, addToken, file) => {
		const formdata = new FormData();
			formdata.append("file", file)
		var opts = {
			method: method,
			headers: {
				Accept: "application/json",
			},
			body : formdata
		};
		if (addToken && loggedIn()) {
			const token = getToken();
			opts.headers["Authorization"] = 'Bearer ' + token;
		}
		
		return opts;
	};
	return {
		makeOptions,
		setToken,
		getToken,
		getRoles,
		getName,
		loggedIn,
		isTokenValid,
		login,
		logout,
		adminExists,
		createUser,
		uploadImage,
		getUserImage,
		fetchData,
	};
}

const facade = userFacade();
export default facade;
