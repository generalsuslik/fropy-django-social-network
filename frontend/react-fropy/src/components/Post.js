import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import PostComments from "./PostComments";
import Card from 'react-bootstrap/Card';

import CommentForm from "./CommentForm";
import TopicInfo from "./TopicInfo";
import UserInfo from "./UserInfo";



function PostContent() {

  const {postSlug} = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/post/${postSlug}/`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const baseUrl = "http://127.0.0.1:8000";

  if (!post){
    return <div><h1>404</h1></div>
  }

  return (
    <div className="ultra-wrapper">
      <div className="wrapper">
        <div className="fropy">
          <Card data-bs-theme="dark" className="post">
            <div className="shapka">
              {post.topic ? (
                <div className="author-link">
                  <Link to={`http://localhost:3000/topics/${post.topic.slug}/`} className="no-underline">
                    <span className="comment-author">
                      <img className="avatar" src={`${baseUrl}${post.topic.image}`} alt={post.topic.title} />
                      {post.topic.title}<span> </span>
                      <span>
                        | Posted by:  
                        <Link className="no-underline" to={`http://localhost:3000/user/${post.user?.profile.slug}`}>{post.user?.username}</Link>
                      </span>
                    </span>
                  </Link>
                </div>
              ) : (
                <span className="author-link">
                  <Link className="no-underline" to={`http://localhost:3000/user/${post.user?.profile.slug}/`}>
                    <span className="comment-author">
                      <img className="avatar" src={`${baseUrl}${post.user?.profile.avatar}`} alt={post.title} />
                      {post.user?.username}
                    </span>
                  </Link>
                </span>
              )}
            </div>

            <div>
              <div className='post-title'>
                <h1>{post.title}</h1>
              </div>
              <div className='post-text'>
                {post.text}
              </div>
              <div className='post-image'>
                <Link className="no-underline" target="_blank" to={`${baseUrl}${post.image}`}>
                  <img src={`${baseUrl}${post.image}`} />
                </Link>
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
                    <dd><a className='no-underline' href='#'>Mute {post.user?.username}</a></dd>
                  )}
                  <dd><a className='no-underline' href='#'>Hide</a></dd>
                </dl>
              </div>
            </div>
          </Card>
          {/* <commentForm /> */}
          <PostComments />
        </div>
        
        <div className="wrapper-info">
          {post.topic ? (
            <div className="topic-info">
              <TopicInfo topicSlug={post.topic?.slug} />
            </div>
          ) : (
            <div className="topic-info">
              {/* <UserInfo profileSlug={post.user?.profile.slug}/> */}
            </div>
          )}
          
        </div>
  
      </div>
      <div className="left-part"></div>
      <div className="right-part"></div>
    </div>
  );
  }


export default PostContent;

