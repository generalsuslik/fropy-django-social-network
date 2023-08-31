import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
                console.log("Error:", err);
            })
    }, {})

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/profiles/${profileSlug}/posts`)
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => {
                console.log("Error:", err);
            })
    }, [])
    
    const baseUrl = "http://127.0.0.1:8000";

    return (
        <div className="wrapper">
            <div className="fropy">
              {posts.length > 0 ? (
                  <div>
                      <p className="white-text">
                          No posts yet
                      </p>
                  </div>
                ) : (
                  <div className="fropy">
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
                                    | Posted by:<span> </span>
                                    <Link className='no-underline' to={`user/${post.user?.profile.slug}`}>{post.user.username}</Link>
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
                )}
            </div>
            <div className="user-info-wrapper">
              <div className="user-info">
                <img className="avatar" src={`${baseUrl}${profile.avatar}`} />
                <h3>{profile.user?.username}</h3>
              </div>
            </div>
        </div>
    );
}


export default Profile;
