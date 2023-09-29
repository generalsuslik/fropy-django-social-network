import React, { useState } from 'react';

const CommentForm = () => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new comment object with the form data
    const newComment = {
      text,
      username,
    };
    // Send a POST request to your Django backend API endpoint
    fetch('http://127.0.0.1:8000/comments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comment"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;