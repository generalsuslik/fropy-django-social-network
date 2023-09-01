import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import processPosts from "../scripts";
import TopicInfo from "./TopicInfo";


const Topic = () => {
    const { topicSlug } = useParams();
    const [topic, setTopic] = useState({});
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/topics/${topicSlug}/posts/`)
          .then(response => {
              setPosts(response.data);
          })
          .catch(err => {
              console.log(err);
          });
        
      processPosts();
    }, []);

    useEffect(() => {
        axios.get(`http://1270.0.0.1:8000/topics/${topicSlug}/`)
            .then(res => {
                setTopic(res.data);
            })
            .catch(err => {
                console.log("Error -> ", err);
            })
    }, [])

    const baseUrl = "http://127.0.0.1:8000";

    console.log('posts - ', posts);

    return (
        <div className="ultra-wrapper">
          <div className="wrapper">
            {posts.length > 0 ? (
                <div className="fropy">
                    {posts.map(post => (
                        <div className="post" key={post.id}>
                            <div className="shapka">
                              <span className='author-link'>
                                <Link className='no-underline' to={`user/${post.user?.profile.slug}/`}>
                                  <span className='comment-author'>
                                    <img className='avatar' src={`${baseUrl}${post.user.profile.avatar}`} />
                                    {post.user.username}
                                  </span>
                                </Link>
                              </span>
                            </div>

                            {processPosts()}
                            <Link to={`/post/${post.slug}/`} className="no-underline">
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
                                <Link className="adds" to={`/post/${post.slug}`}>All comments</Link>
                                <a className="adds" href="#">Share</a>
                                <a className="adds" href="#">Add to bookmarks</a>
                                <button className="menuButton" id="menuButton">&#8943;</button>
                                <div className="hidden menu" id="menu">
                                    <dl>
                                        <dd><a className="no-underline" href="#">Mute {topic.title}</a></dd>
                                        <dd><a className="no-underline" href="#">Hide</a></dd>
                                    </dl>
                                </div>
                            </div> 
                        </div>
                    ))}
                </div>
            ) : (
              <div className="fropy">
                <p className="white-text">No posts yet</p>
              </div>
            )}
            <div className="wrapper-info">
                <div className="topic-info">
                    <TopicInfo topicSlug={topicSlug} />
                </div>
            </div>
          </div>
        </div>
    );
}


export default Topic;


