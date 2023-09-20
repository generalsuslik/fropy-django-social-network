import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {useState, useEffect} from 'react';

import axios from 'axios';

import registration from '../utils/registration';


function NavbarComponent() {

  const [subscriptions, setSubscriptions] = useState([]);
  const currentUser = registration.getCurrentUser();

  console.log('currentUser ->', currentUser);

  const handleLogout = () => {
    registration.logout();
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users/1/subscriptions/`)
      .then(res => {
        setSubscriptions(res.data);
      })
      .catch(err => {
        console.log(`Error in navbar during getting subscriptions -> ${err}`)
      })
  }, [])

  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="bg-body-tertiary fixed-top">
      <Container fluid className='navbar-container'>
        <Navbar.Brand href="/">Fropy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {currentUser ? (
              <NavDropdown title="Topics" id="collasible-nav-dropdown">
                {subscriptions.map(subscription => (
                  <NavDropdown.Item href={`http://localhost:3000/topics/${subscription.topic.slug}/`}>{subscription.topic.title}</NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item href='#'>Create new topic</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <span></span>
            )}
          </Nav>

          <Form inline>
            <Row>
              <Col xs="auto">
                <div className='search-bar'>
                  <Form.Control 
                    type="text"
                    placeholder="Search"
                    className="form-control mr-sm-2"
                    style={{width:"100%"}}
                  />
                </div>
              </Col>
            </Row>
          </Form>
          {currentUser ? (
            <Nav className='navbar-link-block'>
              <Nav.Link className='navbar-link' href='http://localhost:3000/log-in/' onClick={handleLogout}>Log out</Nav.Link>
              <NavDropdown title={currentUser?.username}>
                <NavDropdown.Item href={`http://localhost:3000/user/pythonist/`}>Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className='navbar-link-block'>
              <Nav.Link className='navbar-link' href="http://localhost:3000/sign-up/">Sign up</Nav.Link>
              <Nav.Link className='navbar-link' href="http://localhost:3000/log-in/">Log in</Nav.Link>
            </Nav>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

