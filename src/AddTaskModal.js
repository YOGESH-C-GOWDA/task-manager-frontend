import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
//My imports local 
import "tachyons";
import AddTask from "./AddTask";

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        height: '350px',
        overflow: 'scroll',
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        color: 'black',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal({ id, open1, handleClose }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    // const [open, setOpen] = React.useState(open1);
    // const [open, setOpen] = React.useState(true);

    // const handleOpen = () => {
    //     setOpen(open1);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const body = (
        <div style={modalStyle} className={classes.paper} >
            <AddTask id={id} onClose={handleClose} />
            <SimpleModal />
        </div>
    );

    return (
        <div>
            {/* <button type="button"
                className="userInfo__trial__1__button center b ph2 pv2 input-reset ba b--black bg-transparent grow pointer f6 "
                onClick={handleOpen}>
                Task
      </button> */}
            <Modal
                open={open1}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div >
    );
}
