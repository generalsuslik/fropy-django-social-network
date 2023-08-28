import axios from "axios";
import {useState, useEffect} from 'react';


const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/profiles/user/")
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const baseUrl = "http://127.0.0.1:8000";

    return (
        <div>
            <h1>{profile.user.username}</h1>
        </div>
    );
}


export default Profile;


