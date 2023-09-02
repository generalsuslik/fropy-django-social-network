import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import processPosts from '../scripts.js'

import NewPostForm from './PostForm.js';


const Feed = () => {
    const [posts, setPosts] = useState([]);
    
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

    const baseUrl = "http://127.0.0.1:8000"

    return (
        <div className='wrapper'>
          <div className='fropy'>
            {/* <div className='new-post-link-wrapper'>
              <Link className='new-post-link no-underline' to={'new-post/'}>Create new post</Link>
            </div> */}
            {posts.map(post => (
              <div className='post' key={post.id}>
                <div className='shapka'>
                  {post.topic ? (
                    <div className='author-link'>
                      <Link to={`topics/${post.topic?.slug}`} className='no-underline'>
                        <span className='comment-author'>
                          <img className='avatar' src={`${baseUrl}${post.topic.image}`} alt={post.topic.title} />
                          {post.topic.title}<span> </span>
                          <span>
                            | Posted by:<span> </span>
                            <Link className='no-underline' to={`user/${post.user?.profile.slug}/`}>{post.user.username}</Link>
                          </span>
                        </span>
                      </Link>
                    </div>    
                  ) : (
                    <span className='author-link'>
                      <Link className='no-underline' to={`user/${post.user?.profile.slug}/`}>
                        <span className='comment-author'>
                          <img className='avatar' src={`${baseUrl}${post.user.profile.avatar}`} />
                          {post.user.username}
                        </span>
                      </Link>
                    </span>
                  )}
                </div>
                {processPosts()}
                <Link to={`/post/${post.slug}/`} className='no-underline'>
                  <div className='post-content'>
                    <div className='post-title'>
                      <h2>{post.title}</h2>
                    </div>
                    <div className='post-text'>
                      {post.text}
                    </div>
                    <div className='post-image'>
                      <img src={`${baseUrl}${post.image}`} />
                    </div>
                  </div>
                </Link>

                <div className='adds-block'>
                  <p className='adds'>Created {post.created_at}</p>
                  <Link className='adds' to={`/post/${post.slug}/`}>All comments</Link>
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
        </div>
      );
}


export default Feed

