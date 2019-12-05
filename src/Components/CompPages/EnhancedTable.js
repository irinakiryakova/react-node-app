import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QrReader from 'react-qr-reader';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

class LocateGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: '',
      inordersp: []
    };
    this.toggleOnClick = this.toggleOnClick.bind(this);
  }

  toggleOnClick() {
    fetch(`http://localhost:4000/locate?nSLAVERN=${this.props.nSLAVERN}&sRACK=${this.props.sRACK}&nQUANT=${this.props.nQUANT}`)
     .then(response => response.json())
     .then(result => this.setState({success: true, error: ''}))
     .catch(err => {
       console.error(err)
       this.setState({success: false, error: err})
     })
    }
  render() {
     return (
      <div>
      <IconButton className={this.props.nSLAVERN} onClick={this.toggleOnClick} aria-label="Menu" color="primary">
        <LibraryAdd />
      </IconButton>
      </div>
)}
}

class ModalQR_LocateGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      result: '',
      locate: false,
      errorLocate: '',
    };

    this.toggleOK = this.toggleOK.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.toggleLocate = this.toggleLocate.bind(this);
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

  toggleLocate() {
    fetch(`http://localhost:4000/locate?nSLAVERN=${this.props.nSLAVERN}&sRACK=${this.state.result}&nQUANT=${this.props.nQUANT}`)
     .then(response => response.json())
     .then(response => this.setState({locate: true, errorLocate: ''}))
     .catch(err => {
       console.error(err)
       this.setState({locate: false, errorLocate: err})
     })
    }
  render() {
     return (
      <div>

   <IconButton className="iconButton" aria-label="Menu" color="primary" onClick={this.toggleCancel}>
     <PhotoCamera/>
   </IconButton>
   <InputBase style={{ width: '60%', borderRadius: "4", fontSize:"1em", fontColor:"#e3f2fd", border: "2px solid #f7f7f7"  }} value ={this.state.result} />
   <IconButton className={this.props.nSLAVERN} onClick={this.toggleLocate} aria-label="Menu" color="primary">
     <LibraryAdd />
   </IconButton>
          <Modal isOpen={this.state.modal} toggle={this.toggleCancel} className={this.props.className}>
          <ModalHeader toggle={this.toggleCancel}>Сканер QR</ModalHeader>
          <ModalBody>
          <QrReader
          delay={300}
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

class InorderSpecs extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
           rows: {},
           isFetching: true,
           error:null,
           barcode:'',
       };
   }

componentDidMount() {
  fetch(`http://localhost:4000/inorderspecs?sBARCODE=${this.props.sBARCODE}`)
   .then(response => response.json())
   .then(result => this.setState({rows:result, isFetching: false}))
   .catch(err => {
     console.error(err)
     this.setState({rows:{}, isFetching: false, error: err})
   })}

   componentWillReceiveProps (nextProps) {
       this.setState({barcode: nextProps.sBARCODE})
       fetch(`http://localhost:4000/inorderspecs?sBARCODE=${nextProps.sBARCODE}`)
        .then(response => response.json())
        .then(result => this.setState({rows:result, isFetching: false}))
        .catch(err => {
          console.error(err)
          this.setState({rows:{}, isFetching: false, error: err})
        })
   }

render () {
  const rows = this.state.rows;
  const isFetching = this.state.isFetching;
  const error = this.state.error;

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = Array.from(array).map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'mnemo', numeric: false, disablePadding: false, label: 'Мнемокод' },
  { id: 'count', numeric: true, disablePadding: false, label: 'Кол-во' },
  { id: 'meas', numeric: false, disablePadding: false, label: 'ЕИ' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Цена' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>

          ))}
          <TableCell align='center'>Место хранения
          </TableCell>

      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));


const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Спецификация приходного ордера
          </Typography>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 350,
    tableLayout: 'fixed',
  },
  tr1: {
    border: 'none',
    borderBottomStyle:'hidden',
    marginLeft:0,
  },
  tr2: {
    border: 'none',
    marginLeft:0,
    backgroundColor: '#e3f2fd',
  },
  cell2:{
      padding: 'none',
      marginLeft: 0,
      marginRight: 0,
      boxSizing: "content-box",
      padding:"none",
      width: 5,
  },
    tableWrapper: {
    overflowX: 'auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    borderRadius: 4,
    border: '1px solid #e3f2fd',
     position: 'relative',
     fontSize: 12,
     width: 'auto',
     padding: '10px 12px',
  },
  iconButton: {
    padding: 'none',
  },
}));

function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('SNOMEN');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
        <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table style={{ tableLayout: "auto" }}
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.SNOMEN);
                  return (
                    <Fragment key={row.NRN}>
                    <TableRow className={classes.tr1} >
                    <TableCell align="left" colSpan={7} >{row.SNOMENNAME}</TableCell>
                    </TableRow>
                    <TableRow className={classes.tr2}
                      hover
                      onClick={event => handleClick(event, row.SNOMEN)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" style={{width: '5%'}}>
                        <Checkbox checked={isItemSelected} />
                      </TableCell>
                      <TableCell className={classes.cell2} padding={0} style={{width:'5px'}}>
                        {row.SNOMEN}
                      </TableCell>
                      <TableCell align="right" padding="none" style={{width: '5%'}}>{row.NFACTQUANT}</TableCell>
                      <TableCell align="left" padding="none"  style={{width: '5%'}}>{row.SMEAS_MAIN}</TableCell>
                      <TableCell align="right" padding="none" style={{width: '5%'}}>{row.NPRICE}</TableCell>
                      <TableCell align="center" padding="none" style={{width: '30%'}}>
                        <ModalQR_LocateGoods nSLAVERN={row.NRN} nQUANT={row.NFACTQUANT}/>
                      </TableCell>
                    </TableRow>
                    </Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Предыдущая',
          }}
          nextIconButtonProps={{
            'aria-label': 'Следующая',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Убрать отступы"
      />
    </div>
  );
}
return (
  <div>
    <EnhancedTable/>
  </div>
)
}}

export default InorderSpecs;
