import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
  buttonRoot: {
    backgroundColor: "#47d5dc",
    color: "white",
    borderRadius: 20,
    margin: 3,
    "&:hover": {
      backgroundColor: "#47d5dc",
    }
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
   display: 'grid',
 },
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: 20,
    },
    '&:first-child': {
      borderRadius: 20,
    },
  },
}))(ToggleButtonGroup);

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('center');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment)
  };

  const classes = useStyles();

  return (
    <div>
        <StyledToggleButtonGroup
          orientation="horizontal"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton classes={{
            root: classes.buttonRoot,
          }} value="bold" aria-label="bold">
          January 2, 2021 12:30pm-1:30pm
          </ToggleButton>
          <ToggleButton classes={{
            root: classes.buttonRoot,
          }} value="italic" aria-label="italic">
          January 2, 2021 12:30pm-1:30pm
          </ToggleButton>
          <ToggleButton classes={{
            root: classes.buttonRoot,
          }} value="underlined" aria-label="underlined">
          January 2, 2021 12:30pm-1:30pm
          </ToggleButton>
          <ToggleButton classes={{
            root: classes.buttonRoot,
          }} value="color" aria-label="color">
          January 2, 2021 12:30pm-1:30pm
          </ToggleButton>
        </StyledToggleButtonGroup>
    </div>
  );
}
