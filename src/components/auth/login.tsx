import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../form/input'
import { Card, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'
import { IUser } from 'types/state'

interface Props {
  onSubmit: (e: any) => void
  onChange: (e: any) => void
  onBlur: (e: any) => void
  user: IUser
  message: string
  loading: boolean
}

const Login = ({ message, loading, user, onChange, onBlur, onSubmit }: Props) => {
  const { email, password, errors } = user
  return (
    <Container>
      <Row>
        <Col className="mx-auto" sm={12} md={8} lg={6}>
          <Card className="my-4">
            <Form noValidate onSubmit={onSubmit} className="p-sm-3 p-xs-1">
              <Card.Body>
                <Card.Title as="h3" className="text-center theme-color mb-4 mt-2">
                  Login
                </Card.Title>
                {message.length > 0 && <Alert variant="success">{message}</Alert>}
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={onChange}
                  onBlur={onBlur}
                  text={{
                    module: 'login',
                    label: 'Email',
                    error: errors.email,
                  }}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onBlur={onBlur}
                  onChange={onChange}
                  text={{
                    module: 'login',
                    label: 'Password',
                    error: errors.password,
                  }}
                />
                <Button variant="outline-primary" block size="lg" type="submit" className="mt-4" disabled={loading}>
                  Log me in!
                </Button>

                <Card.Text className="mt-2">
                  Don't have an account? <Link to={'/signup'}>SignUp</Link>
                </Card.Text>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
