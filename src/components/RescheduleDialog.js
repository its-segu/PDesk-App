import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import useGlobal from "../store";
import ToggleButtons from './ToggleButtonGroup'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({

  buttonRoot: {
    backgroundColor: "#47d5dc",
    color: "white",
    borderRadius: 20,
    margin: 3,
    "&:hover": {
      backgroundColor: "#47d5dc",
    }
  },
  buttonPrime: {
    color: "black",
    "&:hover": {
    }
  },
  buttonSecond: {
    color: "black",
    "&:hover": {
    }
  }

}));

export default function RescheduleDialog() {
  const classes = useStyles();
  const [globalState, globalActions] = useGlobal();
  const [open, setOpen]  = useGlobal((state) => state.showDialog);

  const handleClickOpen = () => {
    globalActions.showDialog(true)
  };

  const handleClose = () => {
    globalActions.closeDialog(false)
  };

  return (
    <div>
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    >
    <DialogTitle id="alert-dialog-slide-title">{"Select a date and time to reschedule:"}</DialogTitle>
    <DialogContent>
    <DialogContentText id="alert-dialog-slide-description">
    <ToggleButtons/>
    </DialogContentText>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose} classes={{
      root: classes.buttonSecond,
    }}>
    Cancel
    </Button>
    <Button onClick={handleClose} classes={{
      root: classes.buttonPrime,
    }}>
    Reschedule
    </Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}
