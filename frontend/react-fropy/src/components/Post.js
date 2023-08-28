import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import {useState, useEffect} from 'react';


function PostContent(props) {
    const [post, setPost] = useState({});
    console.log(props);
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/post/${props.slug}/`)
        .then(response => {
          setPost(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [props.slug]);
  
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
      </div>
    );
  }


export default PostContent;

