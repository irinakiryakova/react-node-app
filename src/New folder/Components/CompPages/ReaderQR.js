import React,{Component} from 'react';
import QrReader from 'react-qr-reader';

export default class ReaderQR extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div>
        <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
        </div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '15%', border: "1px solid #f7f7f7"  }}
        />

        <p>{this.state.result}</p>
      </div>
    )
  }
}
