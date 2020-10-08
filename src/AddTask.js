import React, { useState } from 'react';
import "tachyons";
import axios from "./axios.js";

function AddTask({ id }) {

    console.log("id Of the user", id);

    // Set useState variables
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState('2020-10-04');
    const [startDate, setStartDate] = useState('2020-10-02');
    const [status, setStatus] = useState('');
    const [review, setReview] = useState('');

    // const history = useHistory();

    //Function declaration for setting the UseState's

    const setEnteredTitle = (e) => {
        setTitle(e.target.value);
        console.log(e.target.value)
        console.log("title", title)
    }

    const setEnteredDescription = (e) => {
        setDescription(e.target.value);
        console.log(e.target.value)
        console.log("description", description)
    }

    const setEnteredStartDate = (e) => {
        setStartDate(e.target.value);
        console.log(e.target.value);
        console.log("startDate", startDate);
    }
    const setEnteredDeadLine = (e) => {
        setEndDate(e.target.value);
        console.log(e.target.value);
        console.log("endDate", endDate);
    }
    console.log("endDate", endDate);
    console.log("Type of endDate", typeof (endDate));
    console.log("startDate", startDate);
    console.log("Type of startDate", typeof (startDate));

    const setEnteredStatus = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value);
        console.log("status", status);
    }

    const setEnteredReview = (e) => {
        setReview(e.target.value);
        console.log(e.target.value);
        console.log("review", review);
    }

    // const setEnteredDeadLine = (e) => {
    //     setPassword(e.target.value);
    //     console.log(e.target.value);
    //     console.log("password", password);
    // }

    const onClickingSubmit = async (e) => {
        try {

            e.preventDefault();

            if (!title || !description) {
                alert("Title and description Required");
                return 0;
            }

            const task = {
                title,
                description,
                // createdOn,
                startDate,
                endDate,
                status,
                review,
                user: id,
            }

            const response = await axios({
                method: 'post',
                url: '/api/v1/tasks',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                data: JSON.stringify(task)
            })
            console.log("Task added to data base", response.data);
            // setUserInfo(response.data);
            // history.push("/Home");

            setTitle("");
            setDescription("");
            setStatus("");
            setReview("");


            alert("Task added Successfully");

            // document.getElementsByClassName("aaaaa").setTextValue() = "";
            // document.getElementById("regAdmin__name__input").value = "";
            // document.getElementById("email__address__register").value = "";
            // document.getElementById("password_register").value = "";

            document.getElementsByClassName("add__task__clear__data").value = "";


        } catch (err) {
            alert("Error Please added valid Credentials")
            console.log("\n Error while Registering of register Section--->", err.message)
        }
    }


    //Returning the Add task component to app.js
    return (
        <div>
            <div className="addTask">
                {/* add centre in className in article */}
                {/* <article className="br3 ba dark-gray b--black-10 mv0 w-100 w-50-m w-25-l mw6 shadow-5 centre "> */}
                <main className="pa1 black-80">
                    <form className="measure center">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 center">Add New Task</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Title</label>
                                <input
                                    onChange={setEnteredTitle}
                                    className="add__task__clear__data pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="addtask__task"
                                    id="addtask__task" />

                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Description</label>
                                <textarea
                                    onChange={setEnteredDescription}
                                    className="add__task__clear__data pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="textarea"
                                    id="addtask__description" />
                            </div>


                            {/* Created on or Start date will be taken automatically */}
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Start Date</label>
                                <input
                                    onChange={setEnteredStartDate}
                                    className="add__task__clear__data pa2 input-reset ba bg-transparent hover-bg-black hover-white w-95"
                                    type="date"
                                    name="addtask__startDate"
                                    id="addtask__startDate" />
                            </div>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >End Date</label>
                                <input
                                    onChange={setEnteredDeadLine}
                                    className="add__task__clear__data pa2 input-reset ba bg-transparent hover-bg-black hover-white w-95"
                                    type="date"
                                    name="addtask__deadline"
                                    id="addtask__deadline" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Status</label>
                                {/* <label className="" >Status</label> */}
                                {/* <form> */}
                                <input
                                    onClick={setEnteredStatus}
                                    className="add__task__clear__data pa2 "
                                    type="radio"
                                    name="addtask__status"
                                    value="pending"
                                    id="addtask__status" />
                                <label className=" fw6 lh-copy f6" >Pending</label>
                                <input
                                    onClick={setEnteredStatus}
                                    className="add__task__clear__data pa2 "
                                    type="radio"
                                    name="addtask__status"
                                    value="completed"
                                    id="addtask__status__completed" />
                                <label className=" fw6 lh-copy f6" >Completed</label>
                                {/* </form> */}
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" >Review</label>
                                <textarea
                                    onChange={setEnteredReview}
                                    className="add__task__clear__data b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="addtask__review"
                                    id="addtask__rewiew" />
                            </div>

                        </fieldset>
                        <div className="">
                            <input
                                onClick={onClickingSubmit}
                                className=" b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 "
                                type="submit"
                                value="Submit" />
                        </div>
                    </form>
                </main>
                {/* </article> */}

            </div >

        </div>
    )
}

export default AddTask
