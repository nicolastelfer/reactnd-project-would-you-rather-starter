import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddQuestion } from '../../actions/shared'

import {
  Row,
  Col,
  Label,
  Input,
  Form,
  FormGroup,
  Button } from 'reactstrap'

class Index extends Component {

  state = {
    'optionOne': '',
    'optionTwo': '',
    'toHome': false
  }

  handleOptionOneChange = (e) => {

    const optionOne = e.target.value

    this.setState(()=>({
      optionOne
    }))
  }

  handleOptionTwoChange = (e) => {

    const optionTwo = e.target.value

    this.setState(()=>({
      optionTwo
    }))
  }

  handleAddQuestion = (e, optionOne, optionTwo) => {

    e.preventDefault()

    const { dispatch, loginUser } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo, loginUser))
      .then(() =>
        // Is there something that should be checked for setting toHome?
        this.setState({
          'optionOne': '',
          'optionTwo': '',
          'toHome': true
        })
      )
  }

  render() {

    const { optionOne, optionTwo } = this.state

    if ( !this.props.loginUser )
    {
      return <Redirect to={{
        pathname: '/login',
        state: {
          returnPath: '/add'
        }
      }} />
    }

    if ( this.state.toHome )
    {
      return <Redirect to='/' />
    }

    return (
      <Row>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
          <h2 className='title'>New Question</h2>
            <Form onSubmit={(e) => this.handleAddQuestion(e, optionOne, optionTwo)}>
              <FormGroup>
                <Label for="optionOne">Option One</Label>
                <Input
                  id='optionOne'
                  className='input'
                  type='text'
                  placeholder='Option One'
                  value={optionOne}
                  onChange={this.handleOptionOneChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="optionTwo">Option Two</Label>
                <Input
                  id='optionTwo'
                  className='input'
                  type='text'
                  placeholder='Option Two'
                  value={optionTwo}
                  onChange={this.handleOptionTwoChange}
                />
              </FormGroup>
              <FormGroup>
                <Button type='submit' color="success" size="lg" disabled={(optionOne && optionTwo) ? false : true}>Ask New Question</Button>
              </FormGroup>
            </Form>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps({ loginUser }) {
  return {
    loginUser
  }
}

export default connect(mapStateToProps)(Index)