import React, { useState } from 'react';
import "./userInfo.css";
import axios from "./axios.js";
import AddTaskModel from "./AddTaskModal";
// import AddTaskModelTrial__2 from "./AddTaskModelTrial__2";
import "tachyons";



function UserInfo({ id, name, role, email, createdOn }) {

    const [task, setTask] = useState({});
    const [openNewTaskModal, setNewTaskModal] = useState(false);

    //Fuction called on onCick below
    const deleteUser = async () => {

        let del = window.prompt("If u want to delete the user Type YES in capital", "YES");

        if ((del === "yes") || (del === "YES")) {
            try {
                const response = await axios({
                    method: 'delete',
                    url: `/api/v1/users/${id}`,
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },

                })

                console.log(response.data);
                alert(`User ${name} is successfully deleted`)
            } catch (err) {
                console.log("\n Error Delete operation failed in Userinfo Section", err.message);
                return 0;
            }

        } else {
            alert("Delete opration cancled")
        }
    }

    const addNewTask = () => {

        setNewTaskModal(true)

        // try {
        //     const response = await axios({
        //         method: 'delete',
        //         url: `/api/v1/users/${id}`,
        //         headers: { 'Content-Type': 'application/json;charset=utf-8' },

        //     })

        //     console.log(response.data);
        //     alert(`User ${name} is successfully deleted`)
        // } catch (err) {
        //     console.log("\n Error Delete operation failed in Userinfo Section", err.message);
        //     return 0;
        // }
    }

    const handleClose = () => {
        setNewTaskModal(false)
    }

    return (
        <div className="userInfo__trial__1 b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 ">
            {/* <main className="pa1 black-80 "> */}
            <label className="userInfo__trial__1__label pa1  db fw6 lh-copy f6   " >{name.toUpperCase()}</label>
            {/* </main> */}
            <button
                onClick={addNewTask}
                className="userInfo__trial__1__button center b ph2 pv2 input-reset ba b--black bg-transparent grow pointer f6 ">
                Task
            </button>

            {/* <AddTaskModel /> */}
            <button
                onClick={deleteUser}
                className="userInfo__trial__1__button center b ph2 pv2 input-reset ba b--black bg-transparent grow pointer f6 ">
                Del
            </button>
            {/* Trial button to remove error  */}
            {/* <AddTaskModelTrial__2 id={id} /> */}
            {openNewTaskModal && <AddTaskModel id={id} open1={openNewTaskModal} handleClose={handleClose} />}


        </div>
    )
}

export default UserInfo
