import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText } from 'reactstrap'

const LeaderboardList = (props) => {
  const { user, index } = props
  return (
    <Card>
      <CardImg top width="100%" src={user.avatarURL} alt={user.name} />
      <CardBody>
        <CardTitle>{index + 1}. {user.name}</CardTitle>
        <CardText>
          <p><b>Questions Asked:</b> {user.questions.length}</p>
        </CardText>
        <CardText>
          <p><b>Questions Answered:</b> {Object.keys(user.answers).length}</p>
        </CardText>
      </CardBody>
    </Card>
    )
}

export default LeaderboardList