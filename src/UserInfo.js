import React from 'react';
import "./userInfo.css";


function UserInfo({ id, name, role, email, createdOn }) {
    return (
        <div className="userInfo">
            {/* <img className="images" alt="Sorry Not Found" src={`https://robohash.org/${id}?200*200`} /> */}
            <div>
                <h2>{name.toUpperCase()}</h2>
            </div>
        </div>
    )
}

export default UserInfo
