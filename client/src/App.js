import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Main from "./components/Main/Main";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Minimal from "./components/Templates/Minimal/Minimal";
import Material from "./components/Templates/Material/Material";
import Modern from "./components/Templates/Modern/Modern";

function App() {

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_BASE_URL}/gitauth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.user);
			setUser(data.user);
		} catch (err) {
      console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ user ? <Navigate to="/home" /> : <Main /> } />
          <Route exact path="/home" element={ user ? <Home user={user} /> : <Navigate to="/" /> } />
          <Route exact path="/profile" element={ user ? <Profile user={user} /> : <Navigate to="/" /> } />
          <Route exact path="/minimal" element={ user ? <Minimal user={user} /> : <Navigate to="/" /> } >
            <Route path=":id" element={ user ? <Minimal user={user} /> : <Navigate to="/" /> } />
          </Route>
          <Route exact path="/material" element={ user ? <Material user={user} /> : <Navigate to="/" /> } >
            <Route path=":id" element={ user ? <Material user={user} /> : <Navigate to="/" /> } />
          </Route>
          <Route exact path="/modern" element={ user ? <Modern user={user} /> : <Navigate to="/" /> } >
            <Route path=":id" element={ user ? <Modern user={user} /> : <Navigate to="/" /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
