
// server_memory.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let posts = []; // in-memory

app.post('/api/posts', (req, res) => {
  const newPost = req.body || {};
  newPost.createdAt = new Date().toISOString();
  posts.push(newPost);
  res.json({ message: 'Post added (memory)', posts });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Memory API running on http://localhost:${PORT}`));
