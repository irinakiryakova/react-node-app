import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import { compose } from 'redux';
import * as resolve from 'table-resolver';
//import VisibilityToggles from 'reactabular-visibility-toggles';
import * as Table from 'reactabular-table';
import * as tree from 'treetabular';
import * as search from 'searchtabular';
import * as sort from 'sortabular';



const schema = {
  type: 'object',
  properties: {
    snumb: {
      type: 'string'
    },
    nrn: {
      type: 'double'
    },
    nhrn: {
      type: 'double'
    },
    scode: {
      type: 'string'
    },
    sname: {
      type: 'string'
    },
    sprod_kind: {
      type: 'string'
    },
    nquant: {
      type: 'integer'
    }
  },
  required: ['snumb', 'nrn', 'nhrn','scode','sname','sprod_kind','nquant']
};

class TreeTable extends React.Component {
  constructor(props) {
    super(props);

    const columns = this.getColumns();
    const rows = {};//resolve.resolve({ columns })(generateParents(generateRows(100, schema)));

    this.state = {
      searchColumn: 'all',
      query: {},
      sortingColumns: null,
      rows: {},
      columns,
      sCODE: ''
    };

    this.onExpandAll = this.onExpandAll.bind(this);
    this.onCollapseAll = this.onCollapseAll.bind(this);
    this.onToggleColumn = this.onToggleColumn.bind(this);
  }
  getColumns() {
    const sortable = sort.sort({
      // Point the transform to your rows. React state can work for this purpose
      // but you can use a state manager as well.
      getSortingColumns: () => this.state.sortingColumns || {},

      // The user requested sorting, adjust the sorting state accordingly.
      // This is a good chance to pass the request through a sorter.
      onSort: selectedColumn => {
        const sortingColumns = sort.byColumns({
          sortingColumns: this.state.sortingColumns,
          selectedColumn
        });

        this.setState({ sortingColumns });
      }
    });

    return [
      {
        property: 'name',
        props: {
          style: { width: 200 }
        },
        header: {
          label: 'Name',
          transforms: [sortable]
        },
        cell: {
          formatters: [
            tree.toggleChildren({
              getRows: () => this.state.rows,
              getShowingChildren: ({ rowData }) => rowData.showingChildren,
              toggleShowingChildren: rowIndex => {
                const rows = cloneDeep(this.state.rows);

                rows[rowIndex].showingChildren = !rows[rowIndex].showingChildren;

                this.setState({ rows });
              },
              // Inject custom class name per row here etc.
              props: {}
            })
          ]
        },
        visible: true
      },
      {
        property: 'age',
        props: {
          style: { width: 300 }
        },
        header: {
          label: 'Age',
          transforms: [sortable]
        },
        visible: true
      }
    ];
  }

  componentWillReceiveProps (nextProps) {
      this.setState({sCODE: nextProps.sCODE})
      fetch(`http://localhost:4000/completeproc?sCODE=${nextProps.sCODE}`)
       .then(response => response.json())
       .then(result => this.setState({rows:result, isFetching: false}))
       .catch(err => {
         console.error(err)
         this.setState({rows:{}, isFetching: false, error: err})
       })
  }

  render() {
    const {
      searchColumn, columns, sortingColumns, query, rows
    } = this.state;
    const visibleColumns = columns.filter(column => column.visible);


    return (
      <div>


        <button onClick={this.onExpandAll}>Expand all</button>
        <button onClick={this.onCollapseAll}>Collapse all</button>

        <div className="search-container">
          <span>Search</span>
          <search.Field
            column={searchColumn}
            query={query}
            columns={visibleColumns}
            rows={rows}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            onChange={query => this.setState({ query })}
          />
        </div>

        <Table.Provider
          className="pure-table pure-table-striped"
          columns={visibleColumns}
        >
          <Table.Header />

          <Table.Body rows={rows} rowKey="nrn" />
        </Table.Provider>
      </div>
    );
  }
  onExpandAll() {
    this.setState({
      rows: tree.expandAll()(this.state.rows)
    });
  }
  onCollapseAll() {
    this.setState({
      rows: tree.collapseAll()(this.state.rows)
    });
  }
  onToggleColumn({ columnIndex }) {
    const columns = cloneDeep(this.state.columns);

    columns[columnIndex].visible = !columns[columnIndex].visible;

    this.setState({ columns });
  }
}


export default TreeTable;
