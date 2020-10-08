import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login.js";
import Header from "./Header.js";
import Register from "./Register.js";
import Home from "./Home.js"

function App() {

  //Use state
  const [user, setUser] = useState({});
  // const [user, setUser] = useState("hello");


  // Fuction to initeliase useState
  const setUserInfo = ({ _id, name, email, role }) => {
    setUser({
      id: _id,
      name: name,
      email: email,
      role: role
    })
    // setUser("Updated Hello")
    console.log("SetUser section", _id)
    console.log("SetUser section", user)

  }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/Register">
            <Register setUserInfo={setUserInfo} />
          </Route>
          <Route path="/Home">
            {/* {user ? <Home user={user} /> : <Login />} */}
            <Header name={user.name} />
            <Home user={user} />
          </Route>
          <Route path="/">
            <Login setUserInfo={setUserInfo} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
