import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'

import { handleSaveAnswer } from '../../actions/shared'

import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Button } from 'reactstrap'

class QuestionInfo extends Component {

  handleVote = (e, qid, answer) => {

    e.preventDefault()

    const { dispatch } = this.props

    dispatch(handleSaveAnswer(qid, answer))
  }

  render() {

    const {
      id,
      question,
      optionOneSelected,
      optionOneVotePercentage,
      optionTwoSelected,
      optionTwoVotePercentage,
      loginUser
    } = this.props

    if ( !loginUser )
    {
      return <Redirect to={{
        pathname: '/login',
        state: {
          returnPath: '/questions/' + id
        }
      }} />
    }

    if ( !question )
    {
      return (
        <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <h2 className='title'>Oops!</h2>
            <p>We cannot find this page.</p>
          </Col>
        </Row>
      )
    }

    return (
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <h2 className='title'>Would You Rather...?</h2>
          <p>Written by {question.author}</p>
          {
            (optionOneSelected !== true && optionTwoSelected !== true) &&
            <Card>
              <CardBody>
                <CardTitle><h3>{question.optionOne.text}</h3></CardTitle>
                <CardText>
                  <Button color="success" onClick={(e) => this.handleVote(e, id, 'optionOne')}>Vote</Button>
                </CardText>
                <hr/>
                <CardTitle><h3>{question.optionTwo.text}</h3></CardTitle>
                <CardText>
                  <Button color="success" onClick={(e) => this.handleVote(e, id, 'optionTwo')}>Vote</Button>
                </CardText>
              </CardBody>
            </Card>
          }
          {
            (optionOneSelected === true || optionTwoSelected === true) &&
            <Card>
              <CardBody>
                <CardTitle><h3>Question Results</h3></CardTitle>
                <CardText>
                  <p><b>{question.optionOne.text}</b></p>
                  <ListGroup>
                    <ListGroupItem>Vote Count: {question.optionOne.votes.length}</ListGroupItem>
                    <ListGroupItem>Vote Percentage: {optionOneVotePercentage}%</ListGroupItem>
                  </ListGroup>
                  {
                    optionOneSelected &&
                    <Alert color="success">
                      You chose this option!
                    </Alert>
                  }
                </CardText>
                <hr/>
                <CardText>
                  <p><b>{question.optionTwo.text}</b></p>
                  <ListGroup>
                    <ListGroupItem>Vote Count: {question.optionTwo.votes.length}</ListGroupItem>
                    <ListGroupItem>Vote Percentage: {optionTwoVotePercentage}%</ListGroupItem>
                  </ListGroup>
                  {
                    optionTwoSelected &&
                    <Alert color="success">
                      You chose this option!
                    </Alert>
                  }
                </CardText>
              </CardBody>
            </Card>
          }
          <NavLink to='/' exact>
            Return to questions
          </NavLink>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ questions, users, loginUser }, props) {

  const { id } = props.match.params

  return {
    id,
    authorImg: questions[id] ? users[questions[id].author].avatarURL : null,
    question: questions[id] ? questions[id] : null,
    optionOneSelected: questions[id] ? questions[id].optionOne.votes.indexOf(loginUser) > -1 : null,
    optionOneVotePercentage: questions[id] ? (questions[id].optionOne.votes.length / (questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)) * 100 : null,
    optionTwoSelected: questions[id] ? questions[id].optionTwo.votes.indexOf(loginUser) > -1 : null,
    optionTwoVotePercentage: questions[id] ? (questions[id].optionTwo.votes.length / (questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length)) * 100 : null,
    loginUser
  }

}

export default connect(mapStateToProps)(QuestionInfo)