const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const upload = multer({ dest: "uploads/" });

const POSTS_FILE = path.join(__dirname, "posts.json");
const NEWS_FILE = path.join(__dirname, "news.json");
const PAPER_MEDIA_FILE = path.join(__dirname, "paper-media.json");

// ------------------
// Utility: Slug
// ------------------
const slugify = (text) =>
  text.toString().toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

const generateSlug = () => `media-${Date.now()}`;

// ------------------
// NEWS API
// ------------------

// Get all news
app.get("/api/news", (req, res) => {
  if (!fs.existsSync(NEWS_FILE)) return res.json([]);
  const news = JSON.parse(fs.readFileSync(NEWS_FILE));
  res.json(news);
});

// Add news
app.post("/api/news", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ message: "Title and description required" });

  const newsList = fs.existsSync(NEWS_FILE) ? JSON.parse(fs.readFileSync(NEWS_FILE)) : [];
  const id = Date.now(); // unique ID
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;
  while (newsList.find(n => n.slug === slug)) slug = `${baseSlug}-${count++}`;

  const newNews = { id, title, description, slug, createdAt: new Date().toISOString() };
  newsList.push(newNews);
  fs.writeFileSync(NEWS_FILE, JSON.stringify(newsList, null, 2));
  res.json({ message: "News added successfully!", news: newNews });
});

// Update news
app.put("/api/news/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!fs.existsSync(NEWS_FILE)) return res.status(404).json({ message: "News not found" });
  let newsList = JSON.parse(fs.readFileSync(NEWS_FILE));

  const index = newsList.findIndex(n => n.id == id);
  if (index === -1) return res.status(404).json({ message: "News not found" });

  if (title) newsList[index].title = title;
  if (description) newsList[index].description = description;

  if (title) {
    let baseSlug = slugify(title);
    let newSlug = baseSlug;
    let count = 1;
    while (newsList.find((n, i) => n.slug === newSlug && i !== index)) newSlug = `${baseSlug}-${count++}`;
    newsList[index].slug = newSlug;
  }

  fs.writeFileSync(NEWS_FILE, JSON.stringify(newsList, null, 2));
  res.json({ message: "News updated successfully!", news: newsList[index] });
});

// Delete news
app.delete("/api/news/:id", (req, res) => {
  const { id } = req.params;

  if (!fs.existsSync(NEWS_FILE)) return res.status(404).json({ message: "News not found" });
  let newsList = JSON.parse(fs.readFileSync(NEWS_FILE));

  const index = newsList.findIndex(n => n.id == id);
  if (index === -1) return res.status(404).json({ message: "News not found" });

  newsList.splice(index, 1);
  fs.writeFileSync(NEWS_FILE, JSON.stringify(newsList, null, 2));
  res.json({ message: "News deleted successfully!" });
});

// ------------------
// POSTS API (with image)
// ------------------
app.get("/api/posts", (req, res) => {
  if (!fs.existsSync(POSTS_FILE)) return res.json([]);
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE));
  res.json(posts);
});

app.post("/api/posts", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const posts = fs.existsSync(POSTS_FILE) ? JSON.parse(fs.readFileSync(POSTS_FILE)) : [];
  const id = Date.now();
  let baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;
  while (posts.find(p => p.slug === slug)) slug = `${baseSlug}-${count++}`;

  const newPost = { id, title, description, image, slug, createdAt: new Date().toISOString() };
  posts.push(newPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  res.json({ message: "Post added successfully!", post: newPost });
});

app.put("/api/posts/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!fs.existsSync(POSTS_FILE)) return res.status(404).json({ message: "Post not found" });
  let posts = JSON.parse(fs.readFileSync(POSTS_FILE));

  const index = posts.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  if (title) posts[index].title = title;
  if (description) posts[index].description = description;
  if (req.file) posts[index].image = `/uploads/${req.file.filename}`;

  if (title) {
    let baseSlug = slugify(title);
    let newSlug = baseSlug;
    let count = 1;
    while (posts.find((p, i) => p.slug === newSlug && i !== index)) newSlug = `${baseSlug}-${count++}`;
    posts[index].slug = newSlug;
  }

  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  res.json({ message: "Post updated successfully!", post: posts[index] });
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  if (!fs.existsSync(POSTS_FILE)) return res.status(404).json({ message: "Post not found" });

  let posts = JSON.parse(fs.readFileSync(POSTS_FILE));
  const index = posts.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
  res.json({ message: "Post deleted successfully!" });
});

// ------------------
// PAPER PRINT MEDIA API (image only)
// ------------------
app.get("/api/paper-print-media", (req, res) => {
  if (!fs.existsSync(PAPER_MEDIA_FILE)) return res.json([]);
  const media = JSON.parse(fs.readFileSync(PAPER_MEDIA_FILE));
  res.json(media);
});

app.post("/api/paper-print-media", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Image is required" });

  const mediaList = fs.existsSync(PAPER_MEDIA_FILE) ? JSON.parse(fs.readFileSync(PAPER_MEDIA_FILE)) : [];
  const newMedia = { slug: generateSlug(), image: `/uploads/${req.file.filename}`, createdAt: new Date().toISOString() };

  mediaList.push(newMedia);
  fs.writeFileSync(PAPER_MEDIA_FILE, JSON.stringify(mediaList, null, 2));
  res.json({ message: "Paper media added successfully!", media: newMedia });
});

app.put("/api/paper-print-media/:slug", upload.single("image"), (req, res) => {
  const { slug } = req.params;
  if (!fs.existsSync(PAPER_MEDIA_FILE)) return res.status(404).json({ message: "Media not found" });

  let mediaList = JSON.parse(fs.readFileSync(PAPER_MEDIA_FILE));
  const index = mediaList.findIndex(m => m.slug === slug);
  if (index === -1) return res.status(404).json({ message: "Media not found" });

  if (req.file) mediaList[index].image = `/uploads/${req.file.filename}`;
  fs.writeFileSync(PAPER_MEDIA_FILE, JSON.stringify(mediaList, null, 2));
  res.json({ message: "Media updated successfully!", media: mediaList[index] });
});

app.delete("/api/paper-print-media/:slug", (req, res) => {
  const { slug } = req.params;
  if (!fs.existsSync(PAPER_MEDIA_FILE)) return res.status(404).json({ message: "Media not found" });

  let mediaList = JSON.parse(fs.readFileSync(PAPER_MEDIA_FILE));
  const index = mediaList.findIndex(m => m.slug === slug);
  if (index === -1) return res.status(404).json({ message: "Media not found" });

  mediaList.splice(index, 1);
  fs.writeFileSync(PAPER_MEDIA_FILE, JSON.stringify(mediaList, null, 2));
  res.json({ message: "Media deleted successfully!" });
});

// ------------------
// Start Server
// ------------------
app.listen(5000, () => console.log("✅ API server running on http://localhost:5000"));
