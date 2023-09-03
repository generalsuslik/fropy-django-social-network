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
import axios from "axios";


function NavbarComponent() {

  const [currentUser, setCurrentUser] = useState();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user-view/')
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(`currentUser -> ${currentUser}`);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/users/${currentUser?.id}/subscriptions/`)
      .then(res => {
        setSubscriptions(res.data);
      })
      .catch(err => {
        console.log(`Error in navbar during getting subscriptions -> ${err}`)
      })
  }, [])

  return (
    <Navbar collapseOnSelect expand="lg" data-bs-theme="dark" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand href="/">Fropy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            {currentUser ? (
              <NavDropdown title="Topics" id="collasible-nav-dropdown">
                {subscriptions.map(subscription => (
                  <NavDropdown.Item href='#'>{subscription.topic.title}</NavDropdown.Item>
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
                <Form.Control 
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  style={{width:"100%"}}
                />
              </Col>
              {/* <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col> */}
            </Row>
          </Form>
          {currentUser ? (
            <div><h2 className='white-text'>asdasd</h2></div>
          ) : (
            <Nav className='navbar-link-block'>
              <Nav.Link className='navbar-link' href="registration">Sign up</Nav.Link>
              <Nav.Link eventKey={2} href="#">Log in</Nav.Link>
            </Nav>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

