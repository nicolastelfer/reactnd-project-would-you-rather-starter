import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logoutUser } from '../../actions/loggedUser'

import './Nav.css'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav as Navigation,
  NavItem } from 'reactstrap'


class Nav extends Component {
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

  // Dispatch the logoutUser Action
  logoutUser = () => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render () {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Would You Rather</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Navigation className="ml-auto" navbar>
            <NavItem>
              <NavLink to='/' exact activeClassName='active'>
                Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/add' exact activeClassName='active'>
                New Question
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/leaderboard' exact activeClassName='active'>
                Leaderboard
              </NavLink>
            </NavItem>
            <NavItem className="user-details">
              <img src={this.props.avatarURL} className='nav-user-avatar' alt={this.props.name} />
              <span onClick={this.logoutUser}>Log out</span>
            </NavItem>
          </Navigation>
        </Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    avatarURL: users[loginUser].avatarURL
  }
}

export default connect(mapStateToProps)(Nav)