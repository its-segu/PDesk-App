import React from 'react';
import { useState, useEffect, useCallback, updateState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import useGlobal from "../store";


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  appointment: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    height: 50,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    color: "black",
    marginBottom: 5,
    color: "#636161"
  },
  buttonDiv: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: 'row',
    padding: 5
  },
  buttonRoot: {
    backgroundColor: "#47d5dc",
    color: "white",
    "&:hover": {
      backgroundColor: "#47d5dc",
    }
  },
  buttonSecond: {
    backgroundColor: "#a9a9a9",
    color: "white",
    marginRight: 3,
    "&:hover": {
      backgroundColor: "#a9a9a9",
    }
  }
}));

export default function ConfirmedApp(props) {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([])
  const [globalState, globalActions] = useGlobal();
  const [confirmedAppointment, setconfirm]  = useGlobal((state) => state.confirmedAppointments);
  const rescheduleClick = (appointment) => {
    globalActions.showDialog(true);
  }

  return (
    <div className={classes.root}>
    {confirmedAppointment.map((appointment, i) => (
      <div key={i} className={classes.appointment}>
      <h6>{appointment.user.lastName}, {appointment.user.firstName}</h6>
      <h6>{appointment.requestedDateTimeOffset}</h6>
      <div className={classes.buttonDiv}>
      <Button onClick={() => rescheduleClick(appointment)} classes={{
        root: classes.buttonRoot,
      }}>Reschedule</Button>
      </div>
      </div>
    ))}
    </div>
  )
}
