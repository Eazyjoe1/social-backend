const express = require('express');
const cors = require('cors');

const app = express();

// Middleware Decisions:
// cors() allows our React Native app to make requests to this local server.
// express.json() allows the server to read JSON data sent in POST requests.
app.use(cors());
app.use(express.json());

// In-Memory Database
// We use let instead of const so we could technically reassign it, 
// but primarily it holds our state while the server runs.
let posts = [
  { id: '1', author: 'System', content: 'Welcome to your Social Media Network' }
];

// GET Route: Sends the list of posts to the client
app.get('/api/posts', (req, res) => {
  res.status(200).json(posts);
});

// POST Route: Receives a new post from the client and adds it to the list
app.post('/api/posts', (req, res) => {
  const { author, content } = req.body;
  
  const newPost = {
    id: Date.now().toString(), // Simple way to generate a unique ID
    author: author || 'Anonymous',
    content: content
  };

  // unshift adds the new post to the *top* of the feed
  posts.unshift(newPost); 
  
  // Return the newly created post so the client can update its UI
  res.status(201).json(newPost); 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);

});