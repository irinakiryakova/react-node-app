import React,{Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  export default class Header extends React.Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div className="header">
          <Navbar className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} light expand="md" >
            <NavbarBrand href="/">Logo</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Главная</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contacts">Контакты</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} caret>
                    Функции
                  </DropdownToggle>
                  <DropdownMenu style={{backgroundColor: '#e3f2fd'}} right >
                    <DropdownItem  href="/Func1">
                      Функция 1
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem  href="/Func2">
                      Функция 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem  href="/Func3">
                      Функция 3
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
