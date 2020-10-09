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

  // get info from local strogae

  // const nameLocal = JSON.parse(localStorage.getItem("taskManagerUser"))[0];


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


    // Local Storage
    let taskManagerUserArray = [];
    taskManagerUserArray[0] = name;
    taskManagerUserArray[1] = role;
    taskManagerUserArray[2] = _id;

    //Add to local stroge in JSON format
    localStorage.setItem("taskManagerUser", JSON.stringify(taskManagerUserArray))

  }

  // const getNameLocal = () => {

  //   // Get information from local storage
  //   let taskManagerUserArray = [];
  //   if (localStorage.getItem("taskManagerUser") === null) {
  //     taskManagerUserArray = [];
  //   } else {
  //     taskManagerUserArray = JSON.parse(localStorage.getItem("taskManagerUser"));
  //     return taskManagerUserArray[0];
  //   }

  //   return taskManagerUserArray[0];

  // }

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/Register">
            <Register setUserInfo={setUserInfo} />
          </Route>
          <Route path="/Home">
            {/* {user ? <Home user={user} /> : <Login />} */}
           
            {/* <Header name={getNameLocal} /> */}

            {/* // Uncomment later */}
            <Header name={user.name} />
            <Home user={user} />
            {/* // Uncomment later */}

            {/* {nameLocal && <>
              <Header name={user.name} />
              <Home user={user} />
            </>} */}
          </Route>
          <Route exact path="/">
            <Login setUserInfo={setUserInfo} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
