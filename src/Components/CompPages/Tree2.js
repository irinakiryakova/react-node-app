import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import {TreeTable, TreeHeadCol} from 'react-treetable';

//import {noKeyData, data, list} from './fackData';

export default class Tree2 extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            list: [],
            length: 10,
            data: [],
            selected: [],
            expandRowKeys: [],
            sCODE:''
        }
    }

  componentWillReceiveProps (nextProps) {
        this.setState({sCODE: nextProps.sCODE})
        fetch(`http://localhost:4000/completeproc?sCODE=${nextProps.sCODE}`).then(res => {
            return res.json();
        }).then(json => {
            this.setState({
                list: json
            })
        })
    }

    handleClick(display, data, callback) {
        if (!display) {
            fetch(`http://localhost:4000/completeproc?sCODE=${this.state.sCODE}`).then(res => {
                return res.json();
            }).then(json => {
                data.list.push(json[0]);
                callback(data);
            })
        } else {
            callback(data);
        }
    }

    handleArrowClick(collapse, data, cb) {
        if (!collapse && data.chdatalist && !data.chdatalist.length) {
            this.setState(old => {
                old.loading = true;
                return old;
            });
            fetch(`http://localhost:4000/completeproc?sCODE=${this.state.sCODE}`).then(res => {
                return res.json();
            }).then(json => {
                data.chdatalist = json;
                cb(data);
                this.setState(old => {
                    old.loading = false;
                    old.expandRowKeys.push(data.uniqueKey);
                    return old;
                });
            });
        } else {
            cb(data);
            if (collapse) {
                this.setState(old => {
                    old.expandRowKeys.push(data.uniqueKey);
                    return old;
                });
            } else {
                this.setState(old => {
                    old.expandRowKeys.splice(old.expandRowKeys.indexOf(data.uniqueKey), 1);
                    return old;
                });
            }
        }
    }

    headRender() {
        return [
          {
            title: "Наименование",
            name: "SNAME"
            //width: "400px"
          },
          {
            title: "Мнемокод",
            name: "SCODE"
          },
          {
            title: "Вид ДСЕ",
            name: "SPROD_KIND"
          },
          {
            title: "Количество",
            name: "NQUANT"
          },
          {
            title: "Ид",
            name: "id"
          }

          ];
    }

    showArrow(cell, level, row, index, col) {
        if (row.a == 1) {
            return false
        }
        return true;
    }

    render() {
        const dataFormat = {
            "a": function (cell, level, row) {
                return cell + ' I am level ' + level
            },
            "b": function (cell, level, row, index, col) {
                if (level != 0) {
                    // let key = col[index - 1];
                    // return row[key.id || key];
                    return '';
                } else {
                    return cell + ' I am row b'
                }
            },
            "c": function (cell, level, row, index, col) {
                if (level != 0) {
                    let key = col[index - 2];
                    return row[key.id || key];
                } else {
                    return cell
                }
            },
            "d": function (cell, level, row, index, col) {
                if (level != 0) {
                    let key = col[index - 1];
                    return row[key.id || key];
                } else {
                    return cell + 1
                }
            }
        };
        const options = {
            page: 1,
            sizePerPage: 1,
            sizePageList: [10, 20, 30],
            paginationShowsTotal: true,
            onPageChange: function (page, sizePerPage) {

            }
        };

        const selectRow = {
            mode: "checkbox",
            bgColor: "rgb(238, 193, 213)",
            selected: this.state.selected,
            hideSelectColumn: false,
            onSelectAll: (checked, currentSelected) => {
                if (checked) {
                    let checkedList = currentSelected.map(item => {
                        return item.id;
                    });
                    this.setState(old => {
                        old.selected = checkedList;
                        return old;
                    })
                } else {
                    this.setState(old => {
                        old.selected = [];
                        return old;
                    })
                }
            },
            onSelect: (checked, row) => {
                if (checked) {
                    this.setState(old => {
                        old.selected.push(row.id);
                        return old
                    })
                } else {
                    this.setState(old => {
                        old.selected.splice(old.selected.indexOf(row.id), 1);
                        return old;
                    })
                }
            }
        };
        const style = {
            margin: "20px",
            background: "#fff"
        };
        return (
            <div>
                <div style={style}>
                    <TreeTable
                        iskey="a"
                        data={this.state.data}
                        nestedHead={[[{
                            label: 'TreeTable',
                            colspan: 4,
                            rowspan: 2
                        }, 'a', 'a', 'a', 'a'], ['b', 'b', 'b', 'b']]}
                    >
                        <TreeHeadCol width={200} dataField="a" dataFormat={dataFormat.a}>第一列</TreeHeadCol>
                        <TreeHeadCol dataField="b" dataSort={true} width={200}
                                     dataFormat={dataFormat.a}>第二列</TreeHeadCol>
                        <TreeHeadCol width={200} dataField="c" dataSort={true}
                                     dataFormat={dataFormat.a}>第三列</TreeHeadCol>
                        <TreeHeadCol width={200} dataField="d" hidden={false}>第四列</TreeHeadCol>
                        <TreeHeadCol width={200} dataField="d" hidden={false}>第五列</TreeHeadCol>
                        <TreeHeadCol dataField="d" hidden={false}>第六列</TreeHeadCol>
                        <TreeHeadCol dataField="d" hidden={true}>第七列</TreeHeadCol>
                        <TreeHeadCol width={150} dataFormat={()=> {
                            return <a href="#">freedom!</a>
                        }}>操作</TreeHeadCol>
                    </TreeTable>
                </div>
                <div style={style}>
                    <TreeTable
                        height="auto"
                        hashKey={true}
                        data={this.state.data}
                        options={options}
                        onArrowClick={this.handleClick.bind(this)}
                    >
                        <TreeHeadCol dataField="a">第一列</TreeHeadCol>
                        <TreeHeadCol dataField="b">第二列</TreeHeadCol>
                        <TreeHeadCol dataField="c">第三列</TreeHeadCol>
                        <TreeHeadCol dataField="d">第四列</TreeHeadCol>
                    </TreeTable>
                </div>
                <div style={style}>
                    <TreeTable
                        iskey="id"
                        data={this.state.list}
                        isTree={false}
                        selectRow={selectRow}
                    >
                        <TreeHeadCol dataField="id" dataAlign="center" dataFixed="left">id</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='regionRoleName'
                                     dataFixed="left">区域角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataSort={true}
                                     dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='systemRoleName'>系统角色</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='region'
                                     dataFixed="left">区域</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='createTime'>创建时间</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataField='description'
                                     dataFixed="right">描述</TreeHeadCol>
                        <TreeHeadCol dataAlign='center' width="150px" dataFormat={()=> {
                            return <a href="#">freedom!</a>
                        }}>操作</TreeHeadCol>
                    </TreeTable>
                </div>
                <div style={style}>
                    <TreeTable iskey='uniqueKey'
                               childrenPropertyName='chdatalist' expandRowKeys={this.state.expandRowKeys}
                               data={this.state.list} hover={false} onArrowClick={this.handleArrowClick.bind(this)}
                    >
                        {
                            this.headRender().map((item, index)=> {
                                return <TreeHeadCol key={index} dataAlign='center' showArrow={true}
                                                    dataField={item.id}>{item.name}</TreeHeadCol>
                            })
                        }
                    </TreeTable>
                </div>
            </div>
        )
    }
}
