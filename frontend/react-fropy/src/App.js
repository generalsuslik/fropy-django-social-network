import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import PostContent from './components/Post';
import Profile from './components/Profile';
import './style.css';
import './style_comments.css';
import './style_topic.css';
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
          <Route path='/post/:postSlug/' Component={PostContent} />
          {/* <Route path='/:profileSlug' Component={Profile} /> */}
        </Routes>
      </div>
  );
}

export default App;
