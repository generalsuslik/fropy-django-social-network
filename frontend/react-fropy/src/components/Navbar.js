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
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary navbar fixed-top">
      <Container fluid>
        <Navbar.Brand href="/">Fropy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='navbar-collapsed'>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            {currentUser ? (
              <NavDropdown className='navbar-topics-list' title="Topics" id="collasible-nav-dropdown">
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>

          {currentUser ? (
            <Nav className='nav-end navbar-link-block'>
              {/* <Nav.Link className='navbar-link' href='http://localhost:3000/log-in/' onClick={handleLogout}>Log out</Nav.Link> */}
              <NavDropdown className='user-dropdown' title={currentUser?.username}>
                <div className='user-dropdown-box'>
                <NavDropdown.Item className='user-dropdown-item' href={`http://localhost:3000/user/pythonist/`}>Profile</NavDropdown.Item>
                <NavDropdown.Item className='user-dropdown-item' href='#'>Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className='user-dropdown-item' href='#create-topic'>Create topic</NavDropdown.Item>
                <NavDropdown.Item className='user-dropdown-item' href='#best-topics/'>Best topics</NavDropdown.Item>
                <NavDropdown.Item className='user-dropdown-item' href='#help/'>Help</NavDropdown.Item>
                <NavDropdown.Item className='user-dropdown-item' href='#help/'>About Fropy</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className='user-dropdown-item' href='http://localhost:3000/log-in/' onClick={handleLogout}>Log out</NavDropdown.Item>
                </div>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className='nav-end navbar-link-block'>
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

