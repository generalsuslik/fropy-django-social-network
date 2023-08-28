import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import processPosts from '../scripts.js'


const Feed = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
      axios.get("http://localhost:8000/")
          .then(response => {
              setPosts(response.data);
          })
          .catch(err => {
              console.log(err);
          });
        
      processPosts();
    }, []);

    const navigate = useNavigate();
    const submitHandler = (e) => {
      e.preventDefault();
      navigate("/post/i-love-django/");
    };

    const baseUrl = "http://127.0.0.1:8000"

    return (
        <div className='fropy'>
          {posts.map(post => (
            <div className='post' key={post.id}>
              <div className='shapka'>
                {post.topic ? (
                  <div className='author-link'>
                    <a href='#' className='no-underline'>
                      <span className='comment-author'>
                        <img className='avatar' src={`${baseUrl}${post.topic.image}`} alt={post.topic.title} />
                        {post.topic.title}<span> </span>
                        <span>
                           | Posted by: 
                          <a className='no-underline' href='#'>{post.user.username}</a>
                        </span>
                      </span>
                    </a>
                  </div>    
                ) : (
                  <span className='author-link'>
                    <a className='no-underline' href='#'>
                      <span className='comment-author'>
                        <img className='avatar' src={`${baseUrl}${post.user.profile.avatar}`} />
                        {post.user.username}
                      </span>
                    </a>
                  </span>
                )}
              </div>

              <Link to={`/post/i-love-django/`} className='no-underline'>
              {/* <div onClick={() => navigate(`post/${post.slug}`)}> */}
                <div className='post-content'>
                  <div className='post-title'>
                    <h1>{post.title}</h1>
                  </div>
                  <div className='post-text'>
                    {post.text}
                  </div>
                  <div className='post-image'>
                    <img src={`${baseUrl}${post.image}`} />
                  </div>
                </div>
              {/* </div> */}
              </Link>

              <div className='adds-block'>
                <p className='adds'>Created {post.created_at}</p>
                <Link className='adds' to={{pathname: `/post/${post.slug}/`, state: { post } }}>All comments</Link>
                <a className='adds' href='#'>Share</a>
                <a className='adds' href="#">Add to bookmarks</a>
                <button className='menuButton' id='menuButton'>&#8943;</button>
                <div id='menu' className='hidden menu'>
                  <dl>
                    {post.topic ? (
                      <dd><a className='no-underline' href='#'>Mute {post.topic.title}</a></dd>
                    ) : (
                      <dd><a className='no-underline' href='#'>Mute {post.user.username}</a></dd>
                    )}
                    <dd><a className='no-underline' href='#'>Hide</a></dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}


export default Feed

