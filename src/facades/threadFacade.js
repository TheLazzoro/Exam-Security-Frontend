import { BASE_URL } from "../Constants";
import userFacade from './userFacade';
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

	const getThreadById = (id) => {
		const options = makeOptions("GET", false);
		return fetch(BASE_URL + "/ForumThread/" + id, options).then(handleHttpErrors);
	}

	const getPostsByThreadId = (id) => {
		const options = makeOptions("GET", false);
		return fetch(BASE_URL + "/ForumThreadPost/Thread/" + id, options).then(handleHttpErrors);
	}

	const createThread = (title, content) => {
		const options = makeOptions("POST", true, {
			Title: title,
			Content: content,
		});
		return fetch(BASE_URL + "/ForumThread", options);
	}

	const deleteThread = (threadId) => {
		const options = makeOptions("DELETE", true);
		return fetch(BASE_URL + "/ForumThread/" + threadId, options);
	}

	const createPost = (threadId, content) => {
		const post = {
			Content: content,
			ThreadId: threadId,
		};
		const options = makeOptions("POST", true, post);
		return fetch(BASE_URL + "/ForumThreadPost", options);
	}

	const deletePost = (postId) => {
		const options = makeOptions("DELETE", true);
		return fetch(BASE_URL + "/ForumThreadPost/" + postId, options);
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
		if (addToken && userFacade.loggedIn()) {
			const token = userFacade.getToken();
			opts.headers["Authorization"] = 'Bearer ' + token;
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	return {
		makeOptions,
		getAllThreads,
		createThread,
		deleteThread,
		createPost,
		deletePost,
		getThreadById,
		getPostsByThreadId,
		fetchData,
	};
}

const facade = threadFacade();
export default facade;
