import './App.css';

// import Navbar from './components/Navbar';
import Feed from './components/Feed';
import PostContent from './components/Post';
import Profile from './components/Profile';
import NewPostForm from './components/PostForm';
import Topic from './components/Topic';
import NavbarComponent from './components/Navbar';

import './style.css';
import './style_comments.css';
import './style_topic.css';
import './style_profile.css';
import './style_navbar.css';

import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  return (
      <div className="App">
        <NavbarComponent />
        <br/>
        <br/>
        <br/>
        <br/>
        <Routes>
          <Route path='/' Component={Feed} />
          <Route path='post'>
            <Route path=':postSlug/' Component={PostContent} />
          </Route>

          <Route path='topics'>
            <Route path='/topics/:topicSlug/' Component={Topic} />
          </Route>
          
          <Route path='/user/:profileSlug/' Component={Profile} />
          <Route path='/new-post/' Component={NewPostForm} />
        </Routes>
      </div>
  );
}

export default App;
