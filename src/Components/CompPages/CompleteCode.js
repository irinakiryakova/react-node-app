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
import CompleteInfo from  './CompleteInfo';


export default class CompleteCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);

  }

   handleInputChange(event) {
        console.log('fatto', event.target.value);
        this.setState({code: event.target.value});
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
            <IconButton className={classes.iconButton} aria-label="menu" color="primary" >
              <PhotoCamera/>
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Обозначение матресурса"
              onChange={this.handleInputChange}
            />
            <IconButton className={classes.iconButton} aria-label="search" color="primary" onClick={() => {this.props.func(this.state.code)}}>
              <DoneIcon />
            </IconButton>
           <CompleteInfo sBARCODE={this.state.code} />
          </Paper>
          <br/>
      </div>
    );
  }
}
