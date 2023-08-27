import './App.css';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import './style.css'
import './scripts.js'


function App() {
  return (
    <div className="App">
      <Navbar />
      <br/>
      <br/>
      <Feed />
    </div>
  );
}

export default App;
