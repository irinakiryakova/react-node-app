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
import { Link } from 'react-router-dom';

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
            <NavbarBrand>Logo</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link to='/'>Главная</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to='/contacts'>Контакты</Link></NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} caret>
                    Функции
                  </DropdownToggle>
                  <DropdownMenu style={{backgroundColor: '#e3f2fd'}} right >
                    <DropdownItem><Link to='/func1'>
                      Размещение позиций приходного ордера по местам хранения </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><Link to='/func2'>
                      Функция 2 </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem><Link to='/func3'>
                      Функция 3 </Link>
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
