import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Alert,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap'

import { loginUser } from '../../actions/loggedUser'

import './Login.css'

class Login extends Component {

  state = {
    username: '',
    loginFail: false
  }

  handleChange = (e) => {

    const username = e.target.value

    this.setState(() => ({
      username
    }))
  }

  showHelp = (e) => {

    e.preventDefault()

    const { usernames } = this.props

    window.alert('Index Help:\nUse one of the following usernames to login...\n\n' + usernames.join(', '))
  }

  handleLogin = (e) => {

    e.preventDefault()

    const { username } =  this.state
    const { dispatch, usernames } = this.props

    if (usernames.indexOf(username)  > -1) {

      dispatch(loginUser(username))

      this.setState({
        username: '',
        loginFail: false,
      })
    }
    else {
      this.setState({
        username: '',
        loginFail: true,
      })
    }
  }

  render() {

    const { username } = this.state

    if (this.props.loginUser)
    {
      return <Redirect to={this.props.location.state.returnPath} />
    }

    return (
      <div className='login'>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h1>Would You Rather...?</h1>
            <p>Log in to begin game<small>(sarahedo)</small></p>
            <Form className='login-form' onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="username-input">Add username</Label>
                <Input
                  id='username-input'
                  className='input'
                  type='text'
                  placeholder='Who are you?'
                  value={username}
                  onChange={this.handleChange}
                />
                {
                  this.state.loginFail &&
                  <Alert color="danger">
                    Wrong username
                  </Alert>
                }
                <ButtonGroup>
                  <Button color="success" type='submit' size="lg">Login</Button>
                  <Button onClick={this.showHelp} size="lg">Help</Button>
                </ButtonGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({ users, loginUser }) {
  return {
    usernames: Object.keys(users),
    loginUser
  }
}

export default connect(mapStateToProps)(Login)