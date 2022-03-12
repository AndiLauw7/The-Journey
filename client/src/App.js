import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { UserContext } from "./context/userContext";
import Home from "./components/pages/Home";
import DetailJourney from "./components/pages/DetailJourney";
import Bookmark from "./components/pages/Bookmark";
import Profile from "./components/pages/Profile";
import AddJourney from "./components/pages/AddJourney";

//import API
import { API, setAuthToken } from "./configAPI/api";
import ListItem from "./components/pages/list-item";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	const navigate = useNavigate();
	const [state, dispatch] = useContext(UserContext);

	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		if (!state.isLogin) {
			return navigate("/");
		} else {
			return navigate("/");
		}
	}, [state]);

	//always check auth
	const checkUser = async () => {
		try {
			const response = await API.get("/check-auth");
			console.log(response);
			if (response?.status === 404) {
				return dispatch({
					type: "AUTH_ERROR",
				});
			}
			// console.log(response);
			// Get user data
			let payload = response.data.data.user;
			// Get token from local storage
			payload.token = localStorage.token;

			// Send data to useContext

			dispatch({
				type: "USER_SUCCESS",
				payload,
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		checkUser();
	}, []);

	return (
	
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/detail-journey" element={<DetailJourney />} />
				<Route exact path="/profile/:id" element={<Profile />} />
				<Route exact path="/new-journey" element={<AddJourney />} />
				<Route exact path="/bookmark" element={<Bookmark />} />
				<Route exact path="list-items" element={<ListItem />} />
			</Routes>
		
	);
}

export default App;
