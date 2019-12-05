import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputBase from '@material-ui/core/InputBase';

import QrReader from 'react-qr-reader';

export default class ModalExample extends React.Component {
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
      input: {
        marginLeft: 8,
        flex: 1,
        fontSize: 12,
        borderRadius: 4,
         position: 'relative',
         border: '1px solid #e3f2fd',
         width: 'auto',
         padding: '10px 12px',
      },
      iconButton: {
        padding: 10,
      },
      });
     return (
      <div>

   <IconButton className="iconButton" aria-label="Menu" color="primary" onClick={this.toggleCancel}>
     <PhotoCamera/>
   </IconButton>
   <InputBase className={classes.input} style={{fontSize: "28", border: "1px solid #f7f7f7"  }} value ={this.state.result} />

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
            <Button color="primary" onClick={this.toggleOK}>ОК</Button>{' '}
            <Button color="secondary" onClick={this.toggleCancel}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
