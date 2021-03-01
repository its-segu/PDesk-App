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


export default function SimpleContainer() {
  const classes = useStyles();
  const [sortedAppointments, setSortedAppointments] = useState([])
  const [globalState, globalActions] = useGlobal();
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch('https://sampledata.petdesk.com/api/appointments')
    .then(response => response.json())
    .then(data => sortAppointments(data));
  }, []);

  const sortAppointments = (data) => {
    const now = new Date();
    for (var i=0; i < data.length; i++) {
      var startTime = data[i].requestedDateTimeOffset.slice(0, -6)
      var endTimeSplit = data[i].requestedDateTimeOffset.split("-",6)
      var startTimeSplit = data[i].requestedDateTimeOffset.split("T",2)
      data[i]["startTime"] = startTime;
      data[i]["endTime"] = startTimeSplit[0] + "T" + endTimeSplit[3]
    }
    data.sort((a,b) => {
      const [aTime, bTime] = [a.startTime,b.endTime].map(d => Math.abs(new Date(d) - now));
      return bTime - aTime;
    });
    setAppointments(data)
  }

  const rescheduleClick = (appointment) => {
    globalActions.showDialog(true);
  }

  const confirmClick = (appointment) => {
    globalActions.confirmedAppointment(appointment);
    var index = appointments.indexOf(appointment);
    if (index > -1) {
        appointments.splice(index, 1);
    }
    setAppointments(appointments)
  }

  return (
    <div className={classes.root}>
    {appointments.map((appointment, i) => (
      <div key={i} className={classes.appointment}>
      <h6>{appointment.user.lastName}, {appointment.user.firstName}</h6>
      <h6>Date: {appointment.requestedDateTimeOffset.split("T",2)[0]}</h6>
      <h6>Start:{appointment.startTime.split("T",2)[1]}</h6>
      <h6>End:{appointment.endTime.split("T",2)[1]}</h6>
      <div className={classes.buttonDiv}>
      <Button onClick={() => confirmClick(appointment)}  classes={{
        root: classes.buttonSecond,
      }}>Confirm</Button>
      <Button onClick={() => rescheduleClick(appointment)} classes={{
        root: classes.buttonRoot,
      }}>Reschedule</Button>
      </div>
      </div>
    ))}
    </div>
  )
}
