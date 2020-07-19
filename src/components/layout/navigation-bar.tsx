import React from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
interface Props {
  auth: boolean
  onClick: (e: any) => void
}
const Navigationbar = ({ auth, onClick }: Props) => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-3" style={{ minHeight: '4rem' }}>
    <Container>
      <Link to="/blog">
        <Navbar.Brand>{' <Blogster/> '}</Navbar.Brand>
      </Link>
      <Nav className="ml-auto">
        {auth ? (
          <Link to="/logout">
            <Button variant="outline-light" className="mr-sm-2" onClick={onClick}>
              Logout
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="outline-light" className="mr-sm-2">
              Login
            </Button>
          </Link>
        )}
      </Nav>
    </Container>
  </Navbar>
)

export default Navigationbar
