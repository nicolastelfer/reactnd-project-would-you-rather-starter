import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Badge,
  Card,
  CardText } from 'reactstrap'

class Question extends Component {

  render() {

    const { question, id, index } = this.props

    return (
      <Card body>
        <CardText><b>{question.optionOne.text}</b> {index === 0 ? <Badge color="success">New</Badge> : ''}</CardText>
        <CardText>OR</CardText>
        <CardText><b>{question.optionTwo.text}</b></CardText>
        <Link to={`/questions/${id}`}>Details</Link>
      </Card>
    )
  }
}

function mapStateToProps({ questions, loginUser }, { id }) {
  return {
    question: questions[id],
    optionOneSelected: questions[id].optionOne.votes.indexOf(loginUser) > -1,
    optionTwoSelected: questions[id].optionTwo.votes.indexOf(loginUser) > -1
  }
}

export default connect(mapStateToProps)(Question)