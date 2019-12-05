import React,{Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledAlert
 } from 'reactstrap';

  export default class Header extends React.Component {
    constructor(props) {
      super(props);

      this.toggleNavBar = this.toggleNavBar.bind(this);
      this.toggleDropDown = this.toggleDropDown.bind(this);
      this.toggleDropItem = this.toggleDropItem.bind(this);
      this.AlertState = this.AlertState.bind(this);
      this.state = {
        isOpen: false,
        dropdownOpen: false,
        dropitemNum:"",
      };
    }
    toggleNavBar() {
      this.setState({
        isOpen: !this.state.isOpen

      });
    }
    toggleDropDown() {
     this.setState(prevState => ({
       dropdownOpen: !prevState.dropdownOpen
     }));
   }
   toggleDropItem(){
    this.setState(className =>({
      dropitemNum: className
    })
    );
     console.log(this.state);
   }
  AlertState() {
  return (
    <UncontrolledAlert color="info">
    {this.state.dropitemNum}
    </UncontrolledAlert>
  );
  }

    render() {
      return (
        <div className="header">
          <Navbar className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} light expand="md" >
            <NavbarBrand href="/">Logo</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Главная</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contacts">Контакты</NavLink>
                </NavItem>
                <Dropdown nav inNavbar isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                  <DropdownToggle nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} caret>
                    Функции
                  </DropdownToggle>
                  <DropdownMenu  style={{backgroundColor: '#e3f2fd'}} right >
                    <DropdownItem className="func1" onClick={this.toggleDropItem} >
                      Функция 1
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Функция 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Функция 3
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
