import './App.css';

import Feed from './components/Feed';
import PostContent from './components/Post';
import Profile from './components/Profile';
import NewPostForm from './components/PostForm';
import Topic from './components/Topic';
import NavbarComponent from './components/Navbar';
import Login from './components/Login';

import './style.css';
import './style_comments.css';
import './style_topic.css';
import './style_profile.css';
import './style_navbar.css';
import './style_authorization.css';

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

  return (
      <div className="App">
        <NavbarComponent />
        <br/>
        <br/>
        <br/>
        <br/>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='post'>
            <Route path=':postSlug/' Component={PostContent} />
          </Route>

          <Route path='topics'>
            <Route path=':topicSlug/' Component={Topic} />
          </Route>
          
          <Route path='/user/:profileSlug/' Component={Profile} />
          <Route path='/new-post/' Component={NewPostForm} />
          {/* <Route path='/registration/' Component={Login} /> */}
          <Route path='/log-in/' Component={Login} />
        </Routes>
      </div>
  );
}

export default App;
