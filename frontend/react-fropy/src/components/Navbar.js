import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='nav navbar-expand-lg fixed-top'>
      <Link className='site-title' to={"/"}>Fropy</Link>
      <ul>
        <li>
          <a href='#'>New post</a>
        </li>
        <li>
          <Link to={`/profile`}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

