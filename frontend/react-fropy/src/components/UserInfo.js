import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


const UserInfo = props => {
    const baseUrl = "http://127.0.0.1:8000";
    const [profile, setProfile] = useState();

    const {profileSlug} = props;

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/profiles/${profileSlug}/`)
        .then(res => {
          setProfile(res.data);
        })
        .catch(err => {
          console.log(`UserInfo error -> ${err}`)
        })
    })

    return (
        <Card data-bs-theme="dark" className="topic-info-wrapper">
            <div className="topic-info-block">
                <div className="shapka">
                  <Link className="no-underline" to={`http://localhost:3000/user/${profile?.slug}/`}>
                    <img className="avatar" src={`${baseUrl}${profile?.avatar}`} alt={profile?.user.username} />
                    <h2 className="username">{profile?.user.username}</h2>
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
    );
}


export default UserInfo;

