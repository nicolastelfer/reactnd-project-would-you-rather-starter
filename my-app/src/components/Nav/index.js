// React Library
import React, { Component } from 'react'

// React Redux Connect function
import { connect } from 'react-redux'

// NavLink Component
import { NavLink } from 'react-router-dom'

// Logout User Action Creator
import { logoutUser } from '../../actions/loggedUser'

class Nav extends Component {

  // Dispatch the logoutUser Action
  logoutUser = () => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render () {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Questions
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li className='user-details'>
            <img src={this.props.avatarURL} className='nav-user-avatar' alt={this.props.name} />
            <span onClick={this.logoutUser}>Log out</span>
          </li>
        </ul>
        <hr/>
      </nav>
    )
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    avatarURL: users[loginUser].avatarURL
  }
}

export default connect(mapStateToProps)(Nav)