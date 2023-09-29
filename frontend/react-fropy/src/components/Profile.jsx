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
    }, [])
    
    useEffect(() => {
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
      <div className="ultra-wrapper">
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
          {/* <div className="topic-info">
            <UserInfo profileSlug={profileSlug}/>
          </div> */}
          <div className="wrapper-info">
            <Card data-bs-theme="dark" className="topic-info-wrapper">
                <div className="topic-info-block">
                    <div className="shapka">
                      <Link className="no-underline" to={`http://localhost:3000/user/${profile?.slug}/`}>
                        <img className="avatar" src={`${baseUrl}${profile?.avatar}`} alt={profile?.user?.username} />
                        <h2 className="username">{profile?.user?.username}</h2>
                      </Link>
                    </div>

                    <div className="white-text topic-info">
                      {profile?.info ? (
                        <div className="white-text topic-info">
                          <div className="topic-description">
                            {profile?.info}
                          </div>
                        </div>
                      ) : (
                        <span></span>
                      )}
                      <br />
                      <div className="adds">
                        First log-in: {profile?.created_at}
                      </div>
                      <hr className="line" />
                      
                      <div className="button-container">
                        <button className="join-button">Follow</button>
                      </div>
                    </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    );

}


export default Profile;
