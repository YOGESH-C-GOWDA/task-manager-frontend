/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import axios from "./axios.js";
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    DateNavigator,
    Scheduler,
    Toolbar,
    MonthView,
    WeekView,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    DragDropProvider,
    EditRecurrenceMenu,
    AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';

import { appointments } from './appointments';

const containerStyles = theme => ({
    container: {

        width: theme.spacing(68),
        // overflow: 'scroll',
        // width: "400px",
        // width: theme.spacing(28),
        // width: '50%',
        padding: 0,
        // padding: 10,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
});

class AppointmentFormContainerBasic extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            appointmentChanges: {},
        };

        this.getAppointmentData = () => {
            const { appointmentData } = this.props;
            console.log("appoinment data", appointmentData)
            return appointmentData;
        };
        // console.log("appoinment data", appointmentData);
        console.log("appoinment props", this.props);
        console.log("appoinment props.appointmentdate", this.props.appointmentData);
        console.log("appoinment props.appointmentdate id", this.props.appointmentData._id);
        this.getAppointmentChanges = () => {
            const { appointmentChanges } = this.state;
            return appointmentChanges;
        };

        this.changeAppointment = this.changeAppointment.bind(this);
        this.commitAppointment = this.commitAppointment.bind(this);
    }

    changeAppointment({ field, changes }) {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
    }

    commitAppointment(type) {
        const { commitChanges } = this.props;
        const appointment = {
            ...this.getAppointmentData(),
            ...this.getAppointmentChanges(),
        };
        if (type === 'deleted') {

            // The Task from the Database by Axios request
            const onClickDelete = async (e) => {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: `/api/v1/tasks/${this.props.appointmentData._id}`,
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                        // data: JSON.stringify(task)
                    })
                    console.log("Task Deleted from Database", response.data);
                    alert("Task Delete Successfully");
                } catch (err) {
                    alert("Error could not delete the task sorry")
                    console.log("\n Error could not delete the task sorry", err.message)
                }
            }

            onClickDelete();
            commitChanges({ [type]: appointment._id });

        } else if (type === 'changed') {

            // The Task from the Database by Axios request
            const onClickChange = async (e) => {
                try {

                    const task = {
                        status: "Pending",
                        review: "Will Update Soon"
                    }

                    const response = await axios({
                        method: 'put',
                        url: `/api/v1/tasks/${this.props.appointmentData._id}`,
                        headers: { 'Content-Type': 'application/json;charset=utf-8' },
                        data: JSON.stringify(task)
                    })
                    console.log("Task Deleted from Database", response.data);
                    alert("Task Delete Successfully");
                } catch (err) {
                    alert("Error could not delete the task sorry")
                    console.log("\n Error could not delete the task sorry", err.message)
                }
            }

            onClickChange();
            commitChanges({ [type]: { [appointment._id]: appointment } });
        } else {
            commitChanges({ [type]: appointment });
        }
        this.setState({
            appointmentChanges: {},
        });
    }

    render() {
        const {
            classes,
            visible,
            visibleChange,
            appointmentData,
            cancelAppointment,
            target,
            onHide,
        } = this.props;
        const { appointmentChanges } = this.state;

        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };

        const isNewAppointment = appointmentData._id === undefined;
        const applyChanges = isNewAppointment
            ? () => this.commitAppointment('added')
            : () => this.commitAppointment('changed');

        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target: change }) => this.changeAppointment({
                field: [field], changes: change.value,
            }),
            value: displayAppointmentData[field] || '',
            label: field[0].toUpperCase() + field.slice(1),
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            // keyboard: true,
            ampm: false,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({
                field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
            }),
            inputVariant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const cancelChanges = () => {
            this.setState({
                appointmentChanges: {},
            });
            visibleChange();
            cancelAppointment();
        };

        return (
            <div style={{ width: "450px" }}>
                <AppointmentForm.Overlay
                    visible={visible}
                    target={target}
                    // fullSize
                    onHide={onHide}
                >
                    <div>
                        <div className={classes.header}>
                            <IconButton
                                className={classes.closeButton}
                                onClick={cancelChanges}
                            >
                                <Close color="action" />
                            </IconButton>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.wrapper}>
                                <Create className={classes.icon} color="action" />
                                <TextField
                                    {...textEditorProps('title')}
                                />
                            </div>
                            <div className={classes.wrapper}>
                                <CalendarToday className={classes.icon} color="action" />
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDateTimePicker
                                        label="Start Date"
                                        {...pickerEditorProps('startDate')}
                                    />
                                    <KeyboardDateTimePicker
                                        label="End Date"
                                        {...pickerEditorProps('endDate')}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className={classes.wrapper}>
                                <LocationOn className={classes.icon} color="action" />
                                <TextField
                                    {...textEditorProps('location')}
                                />
                            </div>
                            <div className={classes.wrapper}>
                                <Create className={classes.icon} color="action" />
                                <TextField
                                    {...textEditorProps('Status')}
                                />
                            </div>
                            <div className={classes.wrapper}>
                                <Notes className={classes.icon} color="action" />
                                <TextField
                                    {...textEditorProps('Review')}
                                    multiline
                                    rows="6"
                                />
                            </div>
                        </div>
                        <div className={classes.buttonGroup}>
                            {!isNewAppointment && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={() => {
                                        visibleChange();
                                        this.commitAppointment('deleted');
                                    }}
                                >
                                    Delete
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    applyChanges();
                                }}
                            >
                                {isNewAppointment ? 'Create' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </AppointmentForm.Overlay>
            </div>
        );
    }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);

const styles = theme => ({
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(1) * 3,
        right: theme.spacing(1) * 4,
    },
});

/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // data: appointments,
            data: [],
            currentDate: '2020-10-6',
            confirmationVisible: false,
            editingFormVisible: false,
            deletedAppointmentId: undefined,
            editingAppointment: undefined,
            previousAppointment: undefined,
            addedAppointment: {},
            startDayHour: 9,
            endDayHour: 15,
            isNewAppointment: false,
        };

        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

        this.commitChanges = this.commitChanges.bind(this);
        this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
        this.appointmentForm = connectProps(AppointmentFormContainer, () => {
            const {
                editingFormVisible,
                editingAppointment,
                data,
                addedAppointment,
                isNewAppointment,
                previousAppointment,
            } = this.state;

            const currentAppointment = data
                .filter(appointment => editingAppointment && appointment._id === editingAppointment._id)[0]
                || addedAppointment;
            const cancelAppointment = () => {
                if (isNewAppointment) {
                    this.setState({
                        editingAppointment: previousAppointment,
                        isNewAppointment: false,
                    });
                }
            };

            return {
                visible: editingFormVisible,
                appointmentData: currentAppointment,
                commitChanges: this.commitChanges,
                visibleChange: this.toggleEditingFormVisibility,
                onEditingAppointmentChange: this.onEditingAppointmentChange,
                cancelAppointment,
            };
        });
    }

    //Fucntion to get all tasks
    componentDidMount() {

        const getTasks = async () => {
            try {

                const response = await axios({
                    method: 'get',
                    url: '/api/v1/tasks',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    // data: JSON.stringify(user)
                })

                console.log(response.data);

                // set the data as appoinments;
                this.setState({ data: response.data })

            } catch (err) {
                console.log("\n Error while signing of Login Section", err.message);
                return 0;
            }
        }

        getTasks();
    }

    componentDidUpdate() {
        this.appointmentForm.update();
    }

    onEditingAppointmentChange(editingAppointment) {
        this.setState({ editingAppointment });
    }

    onAddedAppointmentChange(addedAppointment) {
        this.setState({ addedAppointment });
        const { editingAppointment } = this.state;
        if (editingAppointment !== undefined) {
            this.setState({
                previousAppointment: editingAppointment,
            });
        }
        this.setState({ editingAppointment: undefined, isNewAppointment: true });
    }

    setDeletedAppointmentId(_id) {
        this.setState({ deletedAppointmentId: _id });
    }

    toggleEditingFormVisibility() {
        const { editingFormVisible } = this.state;
        this.setState({
            editingFormVisible: !editingFormVisible,
        });
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitDeletedAppointment() {
        this.setState((state) => {
            const { data, deletedAppointmentId } = state;
            const nextData = data.filter(appointment => appointment._id !== deletedAppointmentId);

            return { data: nextData, deletedAppointmentId: null };
        });
        this.toggleConfirmationVisible();
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1]._id + 1 : 0;
                data = [...data, { _id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment._id] ? { ...appointment, ...changed[appointment._id] } : appointment));
            }
            if (deleted !== undefined) {
                this.setDeletedAppointmentId(deleted);
                this.toggleConfirmationVisible();
            }
            return { data, addedAppointment: {} };
        });
    }

    render() {
        const {
            currentDate,
            data,
            confirmationVisible,
            editingFormVisible,
            startDayHour,
            endDayHour,
        } = this.state;
        const { classes } = this.props;

        return (
            <Paper>
                <Scheduler
                    data={data}
                    height={400}

                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        onEditingAppointmentChange={this.onEditingAppointmentChange}
                        onAddedAppointmentChange={this.onAddedAppointmentChange}
                    />
                    {/* <WeekView
                        startDayHour={startDayHour}
                        endDayHour={endDayHour}
                    /> */}
                    <MonthView />
                    <AllDayPanel />



                    <EditRecurrenceMenu />
                    <Appointments />
                    <AppointmentTooltip
                        showOpenButton
                        showCloseButton
                        showDeleteButton
                    />
                    <Toolbar />

                    {/* <Toolbar flexibleSpaceComponent={this.flexibleSpace} /> */}
                    <DateNavigator />

                    <ViewSwitcher />
                    <AppointmentForm
                        overlayComponent={this.appointmentForm}
                        visible={editingFormVisible}
                        onVisibilityChange={this.toggleEditingFormVisibility}
                    />
                    <DragDropProvider />
                </Scheduler>

                <Dialog
                    open={confirmationVisible}
                    onClose={this.cancelDelete}
                >
                    <DialogTitle>
                        Delete Appointment
          </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this appointment?
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                            Cancel
            </Button>
                        <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                            Delete
            </Button>
                    </DialogActions>
                </Dialog>

                {/* +++++ // Add Task Icon removed by me +++++++ */}

                <Fab
                    color="secondary"
                    className={classes.addButton}
                    onClick={() => {
                        this.setState({ editingFormVisible: true });
                        this.onEditingAppointmentChange(undefined);
                        this.onAddedAppointmentChange({
                            startDate: new Date(currentDate).setHours(startDayHour),
                            endDate: new Date(currentDate).setHours(startDayHour + 1),
                        });
                    }}
                >
                    <AddIcon />
                </Fab>
            </Paper>
        );
    }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo);
