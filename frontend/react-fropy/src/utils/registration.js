import axios from "axios";


const apiUrl = "http://127.0.0.1:8000/";

const login = (username, password) => {
    return axios.post(`${apiUrl}token/`, {
        username,
        password
    })
    .then(res => {
        if(res.data.access){
            localStorage.setItem('user', JSON.stringify(res.data));
            console.log("Login success", res.data);
        }
        
        return res.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    console.log('user logged out');
}

const getCurrentUser = () => {
    if(!localStorage.getItem('user')){
        console.log('user = null');
        return false;
    }
    console.log('getting current user', localStorage.getItem('user'));
    return JSON.parse(localStorage.getItem('user'));
}

export default {
    login,
    logout,
    getCurrentUser,
};
