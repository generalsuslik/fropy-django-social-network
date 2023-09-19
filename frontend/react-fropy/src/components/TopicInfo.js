import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


const TopicInfo = props => {
    const {topicSlug} = props;
    const baseUrl = "http://127.0.0.1:8000";

    const [topic, setTopic] = useState({});
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/topics/${topicSlug}/`)
        .then(res => {
          setTopic(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }, [])

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/topics/${topicSlug}/subscriptions/`)
        .then(res => {
          setSubscriptions(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }, [])
    
    const members = subscriptions.length;

    return (
        <Card data-bs-theme="dark" className="topic-info-wrapper">
          <div data-bs-theme="dark" className="topic-info-block">
            <div className="shapka">
              <Link className="no-underline" to={`http://localhost:3000/topics/${topic?.slug}`}>
                  <img className="avatar" src={`${baseUrl}${topic?.image}`} />
                  <h2 className="topic-title">{topic?.title}</h2>
              </Link>
            </div>
            
            <div className="white-text topic-info">
              <div className="topic-description">
                  {topic?.description}
              </div>
              <br />
              <br />
              <div className="adds">
                Created {topic?.created_at}
              </div>
              <hr className="line"/>

              <div className="topic-members">
                <p>Members: {members}</p>
              </div>
              <hr className="line" />

              <div className="button-container">
                <button className="join-button">Join</button>
              </div>

            </div>
          </div>
        </Card>
    );
}


export default TopicInfo;

