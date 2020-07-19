import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './landing.scss'

const Landing = () => (
  <Container style={{ height: '75vh' }} className="d-flex flex-column justify-content-center align-items-center">
    {' '}
    <Row className="mb-4">
      <p className="text-secondary h3"> Blogging Platform</p>
    </Row>
    <Row></Row>
  </Container>
)

export default Landing
