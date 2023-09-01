import axios from "axios";
import { useEffect, useState } from "react";


const UserInfo = props => {
    const baseUrl = "http://127.0.0.1:8000";

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
                    <div className="white-text topic-info">
                      <div className="topic-description">
                        {props.user?.profile.info}
                      </div>
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <br />
                  <div className="adds">
                    First log-in: {props.user?.profile.created_at}
                  </div>
                  <hr className="line" />

                  <button className="join-button">Follow</button>
                </div>
            </div>
        </div>
    );
}


export default UserInfo;

