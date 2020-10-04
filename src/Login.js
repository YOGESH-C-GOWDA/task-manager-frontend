import React, { useState } from 'react';
import "./login.css";
import "tachyons";
import axios from "./axios.js";

function Login() {

    // Set useState variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Function declaration for setting the UseState's
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

            const response = await axios({
                method: 'post',
                url: '/api/v1/auth/login',
                data: {
                    password: password
                }
            })

            console.log(response.data);

        } catch (err) {
            console.log("\n Error while signing of Login Section", err.message)
        }
    }


    //Returning the login component to app.js
    return (
        <div className="tm__login">
            <article className="br3 ba dark-gray b--black-10 mv0 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Email</label>
                                <input
                                    onChange={setEnteredEmail}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" >Password</label>
                                <input
                                    onChange={setEnteredPassword}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>

                        </fieldset>
                        <div className="">
                            <input
                                onClick={onClickingSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in" />
                        </div>
                    </form>
                </main>
            </article>

        </div >
    )
}

export default Login
