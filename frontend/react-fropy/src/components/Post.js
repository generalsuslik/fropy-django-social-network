import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';


function PostContent(props) {
    // const [post, setPost] = useState({});
    // console.log(props);
    // useEffect(() => {
    //   axios.get(`http://127.0.0.1:8000/post/${props.slug}/`)
    //     .then(response => {
    //       setPost(response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }, [props.slug]);
  
    // return (
    //   <div>
    //     <h2>{post.title}</h2>
    //     <p>{post.text}</p>
    //   </div>
    // );
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/post/i-love-django/`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.slug]);

  const baseUrl = "http://127.0.0.1:8000"

  return (
    <div>
      <div className="fropy">
        <div className="post">
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

            <div className='adds-block'>
              <p className='adds'>Created {post.created_at}</p>
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
      </div>
    </div>
  );
  }


export default PostContent;

