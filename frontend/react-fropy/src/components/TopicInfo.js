import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const TopicInfo = props => {
    const {title, description, image, created_at} = props;
    const baseUrl = "http://127.0.0.1:8000";

    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/topics/${props.topicSlug}/subscriptions/`)
        .then(res => {
          setSubscriptions(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }, [])

    return (
        <div className="topic-info-wrapper">
          <div className="topic-info-block">
            <div className="shapka">
              <a className="no-underline" href="#">
                  <img className="avatar" src={`${baseUrl}${image}`} />
                  <h2 className="topic-title">{title}</h2>
              </a>
            </div>
            
            <div className="white-text topic-info">
              <div className="topic-description">
                  {description}
              </div>
              <br />
              <br />
              <div className="adds">
                Created {created_at}
              </div>
              <hr className="line"/>

              <div className="topic-members">
                <p>Members: {subscriptions.length}</p>
              </div>
              <hr className="line" />

              <button className="join-button">Join</button>

            </div>
          </div>
        </div>
    );
}


export default TopicInfo;

