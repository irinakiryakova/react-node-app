import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import * as tree from 'treetabular';
import CompleteCode from  './CompleteCode';
import TreeIdDetail from  './TreeIdDetail';
import Tree from  './Tree1';
//import Tree2 from  './Tree2';



export default class Complete extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setbarcode = this.setbarcode.bind(this);
    this.setselectedId = this.setselectedId.bind(this)
    this.state = {
      activeTab: '1',
      barcode:'',
      selectedId:0,
    };

  }

  setbarcode(evt) {
    this.setState({barcode: evt})
  }

  setselectedId(evt) {
    this.setState({selectedId: evt})
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
    <div>
        <CompleteCode func={this.setbarcode} />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              {this.state.barcode}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="7">
              <Tree sCODE={this.state.barcode} func={this.setselectedId}/>
              </Col>
              <Col sm="5">
              <TreeIdDetail id={this.state.selectedId}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
