import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import PostContent from './components/Post';
import Profile from './components/Profile';
import NewPostForm from './components/PostForm';
import Topic from './components/Topic';
import './style.css';
import './style_comments.css';
import './style_topic.css';
import './style_profile.css';
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
      <div className="App">
        <Navbar />
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
