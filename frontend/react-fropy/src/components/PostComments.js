import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';


const PostComments = () => {
    const {postSlug} = useParams();
    let [comments, setComments] = useState([]);
    console.log(postSlug)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/comments/")
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                console.log("Error -> ", err);
            })
    }, [])

    const baseUrl = "http://127.0.0.1:8000";

    comments = comments.filter(comment => comment.post?.slug === postSlug)
    console.log('comments -> ', comments, comments.length)

    return (
        <Card data-bs-theme="dark" className="comments-block">
            {comments.filter(comment => comment.post?.slug === postSlug)
                .map(comment => (
                    <div className="comment">
                        <div className="author-link">
                        <Link className="no-underline" to={`http://localhost:3000/user/${comment.author?.profile.slug}`}>
                            <span className="comment-author">
                                <img className="avatar" src={`${baseUrl}${comment.author?.profile.avatar}`} alt={comment.author?.username} />
                                {comment.author?.username}
                            </span>
                        </Link>
                        </div>

                        <div className="comment-content" style={{margin_left: 20}}>
                            {comment.image ? (
                            <div>
                                <div className="comment-text">
                                {comment.text}
                                </div>
                                <div className="comment-image">
                                <img src={`${baseUrl}${comment.image}`} alt={comment.author?.username} />
                                </div>
                            </div>
                            ) : (
                                <div className="comment-text">
                                    {comment.text}
                                </div>
                            )}

                            <div className="adds-block">
                                <p className="adds">Created {comment.created_at}</p>
                                <a className="adds" href="#">Reply</a>
                                <button className='menuButton' id='menuButton'>&#8943;</button>
                                <div id='menu' className='hidden menu'>
                                <dl>
                                    <dd><a className="no-underline" href="#">Mute {comment.author?.username}</a></dd>
                                </dl>
                                </div>
                            </div>
                        </div>
                        <hr className="white-text" />
                    </div>
                ))}
        </Card>
    );
}


export default PostComments
