import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from '../QuestionPage/index'

import {
  Row,
  Col,
  ButtonGroup,
  Button } from 'reactstrap'

class QuestionList extends Component {

  state = {
    answered: false
  }

  toggleAnswered = (e, answered) => {

    e.preventDefault()

    this.setState(() => ({
      answered
    }))
  }

  render() {

    if ( !this.props.loginUser )
    {
      return <Redirect to={{
        pathname: '/login',
        state: {
          returnPath: '/'
        }
      }} />
    }

    return (
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <h2 className='title'>{this.state.answered === true ? 'Answered Questions' : 'Unanswered Questions'}</h2>
          <ButtonGroup className="tabs">
            <Button onClick={(e) => this.toggleAnswered(e, false)} className={this.state.answered === true ? '' : 'active'}>Unanswered</Button>
            <Button onClick={(e) => this.toggleAnswered(e, true)} className={this.state.answered === true ? 'active' : ''}>Answered</Button>
          </ButtonGroup>
          <ul className="question-list">
            {
              this.state.answered
                ? this.props.answeredQuestionIds.map((id) => (
                  <li key={id}><Question id={id}/></li>
                ))
                : this.props.unansweredQuestionIds.map((id, index) => (
                  <li key={id}><Question id={id} index={index}/></li>
                ))
            }
          </ul>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ questions, loginUser }) {
  return {
    answeredQuestionIds: Object.keys(questions)
      .filter((question) => (questions[question].optionOne.votes.indexOf(loginUser) > -1) || (questions[question].optionTwo.votes.indexOf(loginUser) > -1))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestionIds: Object.keys(questions)
      .filter((question) => (questions[question].optionOne.votes.indexOf(loginUser) === -1) && (questions[question].optionTwo.votes.indexOf(loginUser) === -1))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    loginUser
  }
}

export default connect(mapStateToProps)(QuestionList)