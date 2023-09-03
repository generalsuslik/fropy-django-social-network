import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

import UserInfo from "./UserInfo";
import processPosts from "../scripts";


const Profile = () => {
    const {profileSlug} = useParams();

    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/profiles/${profileSlug}/`)
        .then(res => {
          setProfile(res.data);
        })
        .catch(err => {
          console.log(`Error -> ${err}`);
        })

      axios.get(`http://127.0.0.1:8000/profiles/${profileSlug}/posts/`)
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => {
          console.log(`Error -> ${err}`);
        })
    }, [])

    const baseUrl = "http://127.0.0.1:8000"

    return (
      <div className="wrapper">
        <div className="fropy">
          {posts.map(post => (
            <Card data-bs-theme="dark" className="post" key={post.id}>
              {post.topic ? (
                <div className="shapka">
                  <div className="author-link">
                    <Link to={`http://localhost:3000/topics/${post.topic.slug}/`} className="no-underline">
                      <span className="comment-author">
                        <img className="avatar" src={`${baseUrl}${post.topic?.image}`} alt={post.topic?.title} />
                        {post.topic?.title}
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                <a></a>
              )}

              {processPosts()}
              <Link to={`http://localhost:3000/post/${post.slug}/`} className="no-underline">
                <div className="post-content">
                  <div className="post-title">
                    <h2>{post.title}</h2>
                  </div>
                  <div className="post-text">
                    {post.text}
                  </div>
                  <div className="post-image">
                    <img src={`${baseUrl}${post.image}`} />
                  </div>
                </div>
              </Link>

              <div className="adds-block">
                <p className="adds">Created {post.created_at}</p>
                <Link className="adds" to={`http://localhost:3000/post/${post.slug}`}>All comments</Link>
                <a className="adds" href="#">Share</a>
                <a className="adds" href="#">Add to bookmarks</a>
                <button className="menuButton" id="menuButton">&#8943;</button>
                <div className="hidden menu" id="menu">
                  <dl>
                    {post.topic ? (
                      <dd><a className="no-underline" href="#">Mute {post.topic.title}</a></dd>
                    ) : (
                      <dd><a className="no-underline" href="#">Mute {post.user.username}</a></dd>
                    )}
                    <dd><a className="no-underline" href="#">Hide</a></dd>
                  </dl>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="topic-info">
          <UserInfo profileSlug={profileSlug}/>
        </div>
      </div>
    );

}


export default Profile;
