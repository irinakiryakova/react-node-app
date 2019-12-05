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




export default class InorderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      isFetching: false,
      error:null,
      barcode:'',
    };
  }
  componentWillReceiveProps (nextProps) {
      this.setState({barcode: nextProps.sBARCODE})
      fetch(`http://localhost:4000/inorders?sBARCODE=${nextProps.sBARCODE}`)
       .then(response => response.json())
       .then(result => this.setState({rows:result, isFetching: true}))
       .catch(err => {
         console.error(err)
         this.setState({rows:{}, isFetching: true, error: err})
       })
  }

  render() {
     const { error, isFetching, rows } = this.state;
     if (error) {
       return <div>Error: {error.message}</div>;
     }
      else {
       return (
         <span>
           {rows.map(row => (
             <span key={row.NRN}>
               {row.SINDOCTYPE} {row.SINDOCPREF} - {row.SINDOCNUMB} от {row.DINDOCDATE}
             </span>
           ))}
         </span>
       );
     }
   }
}
