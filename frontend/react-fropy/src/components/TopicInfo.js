import axios from "axios";
import { useEffect, useState } from "react";


const TopicInfo = props => {
    const {title, description, image, created_at} = props;
    const baseUrl = "http://127.0.0.1:8000"

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
              <span >
                  {description}
              </span>
              <br />
              <br />
              <span>
                Created {created_at}
              </span>
            </div>
          </div>
        </div>
    );
}


export default TopicInfo;

