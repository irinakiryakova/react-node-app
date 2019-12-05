import React from "react";
import ReactDOM from "react-dom";
import TableTree from "react-table-tree";
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PageviewIcon from '@material-ui/icons/Pageview';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AddIcon from '@material-ui/icons/Add';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

  export default class Tree extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        rows: [],
        isFetching: false,
        error: '',
        sCODE: '',
        load: false,
        errorLoad: '',
        selectedValue : 0,
      };
    this.handleClick = this.handleClick.bind(this);
    this.handleDraft=this.handleDraft.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({sCODE: nextProps.sCODE})
        fetch(`http://localhost:4000/completeproc?sCODE=${nextProps.sCODE}`)
         .then(response => response.json())
         .then(result => this.setState({rows:result, isFetching: true}))
         .catch(err => {
           console.error(err)
           this.setState({rows:[], isFetching: false, error: err})
         })
    }

    handleClick(event, code, matres) {
      fetch(`http://localhost:4000/draft?nMATRES=${matres}&sCODE=${code}`)
       .catch(err => {
         console.error(err)
       });
    //this.setState({color:'secondary'})

      }
      handleDraft(code, matres, id) {
       //if (e.target.value=='onClick') {return  <IconButton  className={id} size="small" onClick={event => this.handleClick(event, code, matres)}><InsertDriveFileIcon fontSize="small" color="secondary" /></IconButton>;}
       return  <IconButton  className={id} size="small" onClick={event => this.handleClick(event, code, matres)}><InsertDriveFileIcon fontSize="small" color="primary" hoverColor="secondary"/></IconButton>;
        }
      handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          //  setSelectedValue(event.target.value);
          this.props.func(event.target.value);
          this.setState({selectedValue: event.target.value});
          console.log(this.state.selectedValue);
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
    padding: 0,
    marginTop:0,
    },
    divider: {
    width: 1,
    height: 28,
    margin: 4,
    },
      });
    const columns = [
      {
        title: "Обозначение",
        name: "SCODE",
          width: "180px",
          bodyRender: item => {
            return <label>
          <Radio
          checked={this.state.selectedValue == item.id}
          onChange={this.handleChange}
          value={item.id}
          size="small"
          color="default"
          inputProps={{ 'aria-label': item.id }}
          icon={<RadioButtonUncheckedIcon fontSize="small" align="top" />}
          checkedIcon={<RadioButtonCheckedIcon fontSize="small" />}
            />
          {item.SCODE} </label>;
          }
      },
      {
        title: "Наименование",
        name: "SNAME",
        width: "250px",
        bodyRender: item => {
          return <p>{item.SNAME}</p>;
        }
      },
      {
        title: <p style={{writingMode: 'tb-rl',transform:'rotate(180deg)', transformOrigin: 'left bottom 40'}}>Количество</p>,
        name: "NQUANT",//"column2",
        textAlign: "center",
        width: "50px"
        //bodyRender: item => {
        //  return <p>{item.NQUANT}</p>;
        //}
      },
      {
        title: <p style={{writingMode: 'tb-rl',transform:'rotate(180deg)', transformOrigin: 'left bottom 40'}}>Маршрут</p>,
        name: "SROUTE",
        width: "50px",
        textAlign: "right",
        //float: "left",
        bodyRender: item => {
          let coms;
          if (item.SROUTE==='!')  {coms=<PriorityHighIcon fontSize="small" color="error"/>}
          else  {coms=<p style={{color:'#00ff00'}}>{item.SROUTE}</p>}
          return coms;
        }
      },
      {
        title: <p style={{writingMode: 'tb-rl',transform:'rotate(180deg)', transformOrigin: 'left bottom 40'}}>Признак</p>,
        name: "SRES_SIGN",
        width: "100px",
        textAlign: "center",
        //float: "left",
        bodyRender: item => {
          let coms;
          if (item.SRES_SIGN==='!')  {coms=<PriorityHighIcon fontSize="small" color="error"/>}
          else  {coms=<p style={{color:'#00ff00'}}>{item.SRES_SIGN}</p>}
          return coms;
        }
      },
      {
        title: <p style={{writingMode: 'tb-rl',transform:'rotate(180deg)', transformOrigin: 'center bottom 40'}}>Материал</p>,
        name: "NMATERIAL_SIGN",
        width: "100px",
        textAlign: "center",
        //float: "left",
        bodyRender: item => {
          let coms;
          if (item.SRES_SIGN==='0')  {coms=<PriorityHighIcon fontSize="small" color="error"/>}
          else  {coms=<AddIcon fontSize="small" color="primary"/>}
          return coms;
        }
      },
      {
        title: <p style={{writingMode: 'tb-rl',transform:'rotate(180deg)', transformOrigin: 'left bottom 40'}}>Чертеж</p>,
        name: "draft",
        textAlign: "right",
        verticalAlign: "top",
        bodyRender: item => {
          return  this.handleDraft(item.SCODE, item.NMTR_RES, item.id);
          //<IconButton id={item.id} size="small" onClick={event => this.handleClick(event, item.SCODE, item.NMTR_RES)}><InsertDriveFileIcon fontSize="small" color="primary" hoverColor="secondary"/></IconButton>;
        }
      }
    ];
    const rows = this.state.rows;
    const data = {
      list:rows,
      root:0
    };
    const { list, root: rootId, key } = data;
    return (
      <TableTree
        datasets={list}
        columns={columns}
        rootId={rootId}
        //rowKey={key}
        style={{fontFamily: "Montserrat",fontSize: "9px",fontColor:"#e3f2fd",backgroundColor:"rgb(227, 242, 253)"}}
        total={{ visible: false, name: "Тотал" }}
        header={{ fixed: false, top: 100 }}
      />
    );
  }
}
