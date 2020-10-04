import React from 'react';
import Admin from './Admin.js';
import "tachyons";

function Home({ user }) {
    const { id, name, role, email } = user
    return (

        <div>
            <h1>Home page for TASK MANAGER NEW</h1>
            <h3>{id}</h3>
            <h3>{name}</h3>
            <h3>{role}</h3>
            <h3>{email}</h3>
            <Admin />
        </div>
    )
}

export default Home
