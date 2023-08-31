import axios from "axios";
import { useEffect, useState } from "react";


const UserInfo = props => {
    // const {profileSlug} = props;
    const baseUrl = "http://127.0.0.1:8000";

    // const [profile, setProfile] = useState({})

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/profiles/${profileSlug}`)
    //         .then(res => {
    //             setProfile(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, {});

    return (
        <div className="topic-info-wrapper">
            <div className="topic-info-block">
                <div className="shapka">
                  <a className="no-underline" href="#">
                    <img className="avatar" src={`${baseUrl}${props.user?.profile.avatar}`} alt={props.user?.username} />
                    <h2 className="username">{props.user?.username}</h2>
                  </a>
                </div>

                <div className="white-text topic-info">
                  {props.user?.info ? (
                    <div>
                      {props.user?.profile.info}
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <br />
                  <div className="adds">
                    First log-in: {props.user?.profile.created_at}
                  </div>
                </div>
            </div>
        </div>
    );
}


export default UserInfo;

