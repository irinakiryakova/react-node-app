import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';


export default class TreeIdDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }


  render() {
    const classes = makeStyles({
    root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
      });
     return (
      <div>
      <br/>
      <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder={this.props.id}
              onChange={this.handleInputChange}
            />
          </Paper>
          <br/>
      </div>
    );
  }
}
