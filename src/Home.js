import React from 'react';
import Admin from './Admin.js';
import "tachyons";
import "./home.css";
// import Calender from './Calender.js';
// import Demo from "./Demo.js";
import Demo_2 from "./Demo_2.js";





function Home({ user }) {
    const { id, name, role, email } = user
    return (

        <div className="home">
            {/* <h1>TASK MANAGER</h1>
            <h3>{id}</h3>
            <h3>{name}</h3>
            <h3>{role}</h3>
            <h3>{email}</h3> */}
            <div className="home__admin__scheduler">
                <div className="home__admin">
                    {/* <h1>HELLO : {name.toUpperCase()}</h1> */}

                    {/* {role === "admin" ? <Admin name={name} /> : <h1>HELLO : {name}</h1>} */}
                    {role === "admin" ? <Admin name={name} /> : ""}
                </div>

                <div className="home__scheduler">
                    <Demo_2 />
                </div>
                {/* <div className="home__scheduler">
                    <Demo/>
                </div> */}

            </div>

        </div>
    )
}

export default Home
