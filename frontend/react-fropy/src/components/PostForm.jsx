import axios from "axios";
import {useState } from 'react';


const NewPostForm = () => {
    const [formData, setFormData] = useState({
      user: '',
      topic: '',
      title: '',
      image: '',
      text: ''
    });
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const user = localStorage.getItem('user'); // get the user who makes the post from local storage
      axios.post('http://127.0.0.1:8000/', { ...formData, user })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input type="text" name="topic" value={formData.topic} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type="text" name="image" value={formData.image} onChange={handleChange} />
        </label>
        <label>
          Text:
          <textarea name="text" value={formData.text} onChange={handleChange} />
        </label>
        <button type="submit">Add Post</button>
      </form>
    );
  };
  
  export default NewPostForm;
