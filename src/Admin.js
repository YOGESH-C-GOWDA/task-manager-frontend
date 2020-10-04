import React, { useState } from 'react';
import "./admin.css";
import RegisterAdmin from "./RegisterAdmin.js"
import "tachyons";
import UserInfo from "./UserInfo.js";
import axios from "./axios.js";

function Admin() {

    // State
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);




    // Function to update state
    const getUsers = async () => {

        // remove new user registration tab
        setNewUser(false);

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


    const addUser = async () => {

        setUsers([]);
        newUser ? setNewUser(false) : setNewUser(true);

        try {
            const response = await axios({
                method: 'get',
                url: '/api/v1/users',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            })

            console.log(response.data);

        } catch (err) {
            console.log("\n Error while signing of Login Section", err.message);
            return 0;
        }

    }

    //Finale components that gets rendered
    return (
        <div className="admin">
            <div className="admin__buttons">
                <div className="lh-copy mt3">
                    <button onClick={getUsers} className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
                        Users
                    </button>
                </div>
                <div className="lh-copy mt3">
                    <button onClick={addUser} className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
                        Add User
                    </button>
                </div>
            </div>
            <div className="admin__users">
                {users.map((user, i) => {
                    const { _id, name, role, email, createdOn } = user;
                    return (<UserInfo key={_id} id={_id} name={name} role={role} email={email} createdOn={createdOn} />)
                })
                }
            </div>
            <div className="admin__newUser">
                {
                    newUser ? <RegisterAdmin /> : null
                }

            </div>
        </div >
    )
}

export default Admin
