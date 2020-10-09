import React, { useState, useEffect } from 'react';
import "./admin.css";
import RegisterAdmin from "./RegisterAdmin.js"
import "tachyons";
import UserInfo from "./UserInfo.js";
// import AddTask from "./AddTask.js";
import axios from "./axios.js";

// Trial
// import Demo_2 from "./Demo_2.js";

function Admin({ name }) {

    // State
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);
    // const [newTask, setNewTask] = useState(false);

    useEffect(() => {
        const getUsersfromDateBase = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: '/api/v1/users',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                })
                setUsers(response.data);
                console.log(response.data);
            } catch (err) {
                console.log("\n Error while signing of Login Section", err.message);
                return 0;
            }
        }

        getUsersfromDateBase();

    }, [newUser]);

    useEffect(() => {
        console.log("Use effect 2 test")
    }, [newUser])




    // Function to update state
    const getUsers = async () => {

        // remove new user registration tab

        setNewUser(false);
        // setNewTask(true);

        // try {
        //     const response = await axios({
        //         method: 'get',
        //         url: '/api/v1/users',
        //         headers: { 'Content-Type': 'application/json;charset=utf-8' },
        //     })

        //     setUsers(response.data);

        //     console.log(response.data);

        // } catch (err) {
        //     console.log("\n Error while signing of Login Section", err.message);
        //     return 0;
        // }

    }


    const addUser = () => {

        // newUser ? setNewUser(false) : setNewUser(true);
        setNewUser(true);

    }

    //Finale components that gets rendered
    return (
        <div className="admin">
            {/* <h1>HELLO : {name.toUpperCase()}</h1> */}
            <div className="admin__admin__controls">
                {/* <h1>HELLO : {name.toUpperCase()}</h1> */}
                <div className="admin__buttons">
                    <div className="lh-copy mt3">
                        <button onClick={getUsers} className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6">
                            Users
                    </button>
                    </div>
                    <div className="lh-copy mt3">
                        <button onClick={addUser} className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6">
                            Add User
                    </button>
                    </div>
                </div>
                <div className="admin__scroll">

                    {/*  Display users from database */}
                    <div className="admin__users">
                        {!newUser && users.map((user, i) => {
                            const { _id, name, role, email, createdOn } = user;
                            return (<UserInfo key={_id} id={_id} name={name} role={role} email={email} createdOn={createdOn} />)
                        })
                        }
                    </div>

                    {/* Assign Task to the user */}
                    {/* <div className="admin__add__task">
                    { newTask ? <AddTask /> : null}
                     </div> */}

                    {/* Register New User  */}
                    <div className="admin__newUser">
                        {newUser ? <RegisterAdmin /> : null}
                    </div>
                </div>
            </div>
            {/* <div className="admin__scheduler">
                <Demo_2 />
            </div> */}

        </div >

    )
}

export default Admin
