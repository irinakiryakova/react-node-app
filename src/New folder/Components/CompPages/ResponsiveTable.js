import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QrReader from 'react-qr-reader';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import { Table, Row, Cell } from 'react-responsive-table';

class ModalQR extends React.Component {
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
     return (
      <div>

   <IconButton className="iconButton" aria-label="Menu" color="primary" onClick={this.toggleCancel}>
     <PhotoCamera/>
   </IconButton>
   <InputBase  style={{ width: '60%', borderRadius: "4", fontSize:"1em", fontColor:"#e3f2fd", border: "2px solid #f7f7f7"  }} value ={this.state.result} />

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
           error:null
       };
   }

componentDidMount() {
  fetch('http://localhost:4000/inorderspecs')
   .then(response => response.json())
   .then(result => this.setState({rows:result, isFetching: false}))
   .catch(err => {
     console.error(err)
     this.setState({rows:{}, isFetching: false, error: err})
   })}
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
  { id: 'mnemo', numeric: false, disablePadding: true, label: 'Мнемокод' },
  { id: 'count', numeric: true, disablePadding: true, label: 'Кол-во' },
  { id: 'meas', numeric: false, disablePadding: true, label: 'ЕИ' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Цена' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <Table>
      <Row>
        <Cell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </Cell>
        {headRows.map(row => (
          <Cell
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
          </Cell>

          ))}
          <Cell align='center'>Место хранения
          </Cell>
          <Cell align='left'>Разместить
          </Cell>
      </Row>
    </Table>
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
    minWidth: 500,
  },
  tr1: {
    background: '#fff8dc',
    border: 'none',
  },
  tr2: {
    background: '#e3f2fd',
    border: 'none',
  },
  cell2:{
    marginLeft: 8,
    align: "left",
     fontSize: 16,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    borderRadius: 4,
     position: 'relative',
     border: '1px solid #e3f2fd',
     fontSize: 12,
     width: 'auto',
     padding: '10px 12px',
  },
  iconButton: {
    padding: 10,
  },
}));

function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('SNOMEN');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
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
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table material>
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = isSelected(row.SNOMEN);
                  return (
                    <Fragment>
                    <Row className={classes.tr1}  material>
                    <Cell className={classes.cell2} minWidthPx={200} colSpan={7}  material>
                    {row.SNOMENNAME}
                    </Cell>
                    </Row>
                    <Row className={classes.tr2} minWidthPx={30}
                      hover
                      onClick={event => handleClick(event, row.SNOMEN)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.NRN}
                      selected={isItemSelected}
                    >
                      <Cell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </Cell>
                      <Cell minWidthPx={80} component="th" scope="row" padding={3}>
                        {row.SNOMEN}
                      </Cell>
                      <Cell minWidthPx={30} align="right">{row.NFACTQUANT}</Cell>
                      <Cell minWidthPx={30} align="left" >{row.SMEAS_MAIN}</Cell>
                      <Cell minWidthPx={40} align="right">{row.NPRICE}</Cell>
                      <Cell align="center" >
                        <ModalQR />
                      </Cell>
                      <Cell align="left" >
                        <Tooltip title="Разместить на месте хранения">
                        <IconButton className="LibraryAdd" aria-label="Menu" color="primary">
                            <LibraryAdd />
                          </IconButton>
                       </Tooltip>
                     </Cell>
                    </Row>
                    </Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <Row style={{ height: 49 * emptyRows }}>
                  <Cell colSpan={7} />
                </Row>
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
