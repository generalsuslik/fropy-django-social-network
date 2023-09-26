import axios from "axios";
import { useState, useEffect } from "react";

import registration from "./registration";

const baseUrl = "http://127.0.0.1:8000/"

const GetUser = () => {
    const currentUserData = registration.getCurrentUser();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}users`)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(`Error in getting users (index.js) -> ${err}`);
            })
    }, []);

    let currentUser = null;
    for (let i = 0; i < users.length; i++){
        if (users[i].username === currentUserData.username){
            currentUser = users[i];
            break;
        }
    }

    return currentUser;

}

export default {
    GetUser,
};
