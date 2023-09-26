import axios from "axios";
import { useState, useEffect } from "react";

import getUser from ".";

const baseUrl = "http://127.0.0.1:8000/"

const JoinTopic = (topicSlug) => {
    const [topic, setTopic] = useState({});

    useEffect(() => {
        axios.get(`${baseUrl}topics/${topicSlug}/`)
            .then(res => {
                setTopic(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const currentUser = getUser();

    console.log(`Join -> ${currentUser, topic.title, topic.slug}`)

    const subscriptionData = { user: currentUser, topic: topic };

    try {
        const response = axios.post('http://127.0.0.1:8000/subscriptions/', subscriptionData);
        if (response.status === 200) {
          console.log(`Subscription created successfully`);
        } else {
          console.log(`Error creating subscription: ${response.status}`);
        }
      } catch (error) {
        console.log(`Error creating subscription: ${error}`);
      }

}

const LeaveTopic = (topicSlug) => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}subscriptions/`)
            .then(res => {
                setSubscriptions(res.data);
            })
            .catch(err => {
                console.log(`Error in leaveTopic -> ${err}`);
            })
    }, []);

    const currentUser = getUser();

    let targetSubscription = null;
    for (let i = 0; i < subscriptions.length; i++){
        if (subscriptions[i].topic.slug === topicSlug && subscriptions[i].user.username === currentUser.username){
            targetSubscription = subscriptions[i];
            break;
        }
    }

    console.log(`Leave -> ${currentUser.username}, ${targetSubscription.id}`)

    try {
        const response = axios.delete(`${baseUrl}subscriptions/${targetSubscription.id}/`)
    
        if (response.status === 200){
            console.log(`Subscription ${targetSubscription.id} deleted successfully`);
        } else {
            console.log(`Error deleting subscription ${targetSubscription.id}: ${response.status}`);
        }
    } catch (err){
        console.log(`Try - except error -> ${err}`)
    }
}
export default {
    JoinTopic,
    LeaveTopic,
};
