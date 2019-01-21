import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Row,
  Col } from 'reactstrap'

import LeaderboardList from '../LeaderboardList'

class Leaderboard extends Component {

  render() {

    if ( !this.props.loginUser )
    {
      return <Redirect to={{
        pathname: '/login',
        state: {
          returnPath: '/leaderboard'
        }
      }} />
    }

    return (
      <div className='leaderboard'>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <h2 className='title'>Leaderboard</h2>
            <div className="leaderboard-list">
              {
                this.props.users.map((user, index) => (
                  <LeaderboardList user={user} index={index} key={user.name} />
                ))
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({ users, loginUser }) {

  return {
    users: Object.keys(users).sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)).map((user) => users[user]),
    loginUser
  }
}

export default connect(mapStateToProps)(Leaderboard)