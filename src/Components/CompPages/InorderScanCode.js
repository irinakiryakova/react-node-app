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
import InorderInfo from  './InorderInfo';


import QrReader from 'react-qr-reader';

export default class InorderScanCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      result: ''
    };

    this.toggleOK = this.toggleOK.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  toggleOK() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      result: this.state.result
    }));

      }
  toggleCancel() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      result: ''
    }));

  }
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
    })
    };
      }

  handleError = err => {
    console.error(err)
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
            <IconButton className={classes.iconButton} aria-label="menu" color="primary" onClick={this.toggleCancel}>
              <PhotoCamera/>
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Штрих-код ПО"
              label="Штрих-код ПО"
            />
            <IconButton className={classes.iconButton} aria-label="search" color="primary" onClick={() => {this.props.func(this.state.result)}}>
              <DoneIcon />
            </IconButton>
          </Paper>
          <br/>
        <Modal isOpen={this.state.modal} toggle={this.toggleCancel} className={this.props.className}>
          <ModalHeader toggle={this.toggleCancel}>Сканер QR</ModalHeader>
          <ModalBody>
          <QrReader
          delay={100}
          onError={this.handleError}
          onScan={ data => {
            if (data) {
              this.setState({
                result: data
              })
            };
              }}
          style={{ width: '70%', border: "1px solid #f7f7f7"  }}
          />
          <p>{this.state.result}
          </p>
          </ModalBody>
          <ModalFooter>
            <IconButton color="primary" onClick={this.toggleOK}>  <DoneIcon /></IconButton>
            <IconButton color="secondary" onClick={this.toggleCancel}>  <CancelIcon /></IconButton>
          </ModalFooter>
        </Modal>
         <InorderInfo sBARCODE={this.state.result} />
      </div>
    );
  }
}
