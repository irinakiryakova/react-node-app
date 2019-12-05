import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import InorderSpecs1 from  './EnhancedTable';
import InorderSpecs2 from  './ResponsiveTable';
import InorderSpecs3 from  './ResponsiveTable1';
import InorderScanCode from  './InorderScanCode';


export default class TableTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.setbarcode = this.setbarcode.bind(this)
    this.state = {
      activeTab: '1',
      barcode:'',
    };
  }

  setbarcode(evt) {
    this.setState({barcode: evt})
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
        <InorderScanCode func={this.setbarcode} />
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              TableNonResponsive
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              TableResponsive
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              TableResponsive2
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              {this.state.barcode}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <InorderSpecs1 sBARCODE={this.state.barcode} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
              <InorderSpecs2/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
              <InorderSpecs3/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
