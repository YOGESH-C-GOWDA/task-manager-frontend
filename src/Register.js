import React, { useState } from 'react';
import "./register.css";
import { Link, useHistory } from "react-router-dom";
import "tachyons";
import axios from "./axios.js";

function Register({ setUserInfo }) {

    // Set useState variables
    const [name, setName] = useState('');
    // const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    //Function declaration for setting the UseState's

    const setEnteringName = (e) => {
        setName(e.target.value);
        console.log(e.target.value)
        console.log("Name", email)
    }

    // const setEnteringRole = (e) => {
    //     setRole(e.target.value);
    //     console.log(e.target.value)
    //     console.log("Role", email)
    // }

    const setEnteredEmail = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value)
        console.log("Email", email)
    }

    const setEnteredPassword = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);
        console.log("password", password);
    }

    const onClickingSubmit = async (e) => {
        try {

            e.preventDefault();

            if (!name || !email || !password) {
                alert("Invalid Credentials Bye");
                return 0;
            }

            const user = {
                name: name,
                // role: role,
                email: email,
                password: password
            }

            const response = await axios({
                method: 'post',
                url: '/api/v1/auth/register',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                data: JSON.stringify(user)
            })
            console.log("Registration --- ", response.data);
            setUserInfo(response.data);

            history.push("/Home")

        } catch (err) {
            console.log("\n Error while Registering of register Section--->", err.message)
        }
    }


    //Returning the login component to app.js
    return (
        <div className="tm__register">
            <article className="br3 ba dark-gray b--black-10 mv0 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure center">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Name</label>
                                <input
                                    onChange={setEnteringName}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                />
                            </div>
                            {/* <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Role</label>
                                <input
                                    onChange={setEnteringRole}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                />
                            </div> */}
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Email</label>
                                <input
                                    onChange={setEnteredEmail}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address_register" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" >Password</label>
                                <input
                                    onChange={setEnteredPassword}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password_register" />
                            </div>

                        </fieldset>
                        <div className="">
                            <input
                                onClick={onClickingSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 "
                                type="submit"
                                value="Register" />
                        </div>
                    </form>
                    <Link to="/" >
                        <div className="lh-copy mt3">
                            <button
                                className="center b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 ">
                                Login
                        </button>

                        </div>
                    </Link>
                </main>
            </article>

        </div >
    )
}

export default Register;
