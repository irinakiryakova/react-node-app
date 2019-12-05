import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QrReader from 'react-qr-reader';
import { Alert } from 'reactstrap';


  export default class ReaderQR1 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
      isClicked: false
    };

    this.handleScan = this.handleScan.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        isClicked: true
      })
    };
      }

  handleError = err => {
    console.error(err)
  }

  toggle =() => {

    this.setState({
      isClicked: true
    })
    }

  render() {
    return (
      <div>
      <form className="FormQrReader">
       <Alert color="primary">
        <button value="Read QR" onClick={this.toggle} />
         <QrReader
         delay={1000}
         onError={this.handleError}
         onScan={this.handleScan}
         style={{ width: '15%', border: "1px solid #f7f7f7"  }}
       />

       </Alert>

     <br></br>
          <label>
            QR:
            <input readOnly type="text" value={this.state.result} />
          </label>
      </form>
      </div>
    )
  }
}
