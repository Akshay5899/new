const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------
// Ensure uploads folder exists
// ------------------
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ------------------
// JSON FILES
// ------------------
const POSTS_FILE = path.join(__dirname, "posts.json");
const NEWS_FILE = path.join(__dirname, "news.json");
const PAPER_MEDIA_FILE = path.join(__dirname, "paper-media.json");
const ALBUMS_FILE = path.join(__dirname, "albums.json");

// ------------------
// Utility functions
// ------------------
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

const readJSON = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : []);
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ------------------
// Multer setup
// ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ------------------
// NEWS API
// ------------------
app.get("/api/news", (req, res) => res.json(readJSON(NEWS_FILE)));

app.post("/api/news", (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ message: "Title and description required" });

  let newsList = readJSON(NEWS_FILE);
  const id = Date.now();
  let slug = slugify(title);
  let count = 1;
  while (newsList.find((n) => n.slug === slug)) slug = `${slugify(title)}-${count++}`;

  const newNews = { id, title, description, slug, createdAt: new Date().toISOString() };
  newsList.push(newNews);
  writeJSON(NEWS_FILE, newsList);
  res.json({ message: "News added successfully!", news: newNews });
});

app.put("/api/news/:id", (req, res) => {
  let newsList = readJSON(NEWS_FILE);
  const index = newsList.findIndex((n) => n.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "News not found" });

  const { title, description } = req.body;
  if (title) newsList[index].title = title;
  if (description) newsList[index].description = description;

  if (title) {
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (newsList.find((n, i) => n.slug === slug && i !== index)) slug = `${baseSlug}-${count++}`;
    newsList[index].slug = slug;
  }

  writeJSON(NEWS_FILE, newsList);
  res.json({ message: "News updated successfully!", news: newsList[index] });
});

app.delete("/api/news/:id", (req, res) => {
  let newsList = readJSON(NEWS_FILE);
  const index = newsList.findIndex((n) => n.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "News not found" });

  newsList.splice(index, 1);
  writeJSON(NEWS_FILE, newsList);
  res.json({ message: "News deleted successfully!" });
});

// ------------------
// POSTS API
// ------------------
app.get("/api/posts", (req, res) => res.json(readJSON(POSTS_FILE)));

app.post("/api/posts", upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  let posts = readJSON(POSTS_FILE);

  const id = Date.now();
  let slug = slugify(title);
  let count = 1;
  while (posts.find((p) => p.slug === slug)) slug = `${slugify(title)}-${count++}`;

  const newPost = { id, title, description, image, slug, createdAt: new Date().toISOString() };
  posts.push(newPost);
  writeJSON(POSTS_FILE, posts);
  res.json({ message: "Post added successfully!", post: newPost });
});

app.put("/api/posts/:id", upload.single("image"), (req, res) => {
  let posts = readJSON(POSTS_FILE);
  const index = posts.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  const { title, description } = req.body;
  if (title) posts[index].title = title;
  if (description) posts[index].description = description;
  if (req.file) posts[index].image = `/uploads/${req.file.filename}`;

  if (title) {
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (posts.find((p, i) => p.slug === slug && i !== index)) slug = `${baseSlug}-${count++}`;
    posts[index].slug = slug;
  }

  writeJSON(POSTS_FILE, posts);
  res.json({ message: "Post updated successfully!", post: posts[index] });
});

app.delete("/api/posts/:id", (req, res) => {
  let posts = readJSON(POSTS_FILE);
  const index = posts.findIndex((p) => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  writeJSON(POSTS_FILE, posts);
  res.json({ message: "Post deleted successfully!" });
});

// ------------------
// PAPER PRINT MEDIA API
// ------------------
app.get("/api/paper-print-media", (req, res) => res.json(readJSON(PAPER_MEDIA_FILE)));

app.post("/api/paper-print-media", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Image is required" });

  let mediaList = readJSON(PAPER_MEDIA_FILE);
  const newMedia = {
    slug: Date.now().toString(),
    image: `/uploads/${req.file.filename}`,
    createdAt: new Date().toISOString(),
  };

  mediaList.push(newMedia);
  writeJSON(PAPER_MEDIA_FILE, mediaList);
  res.json({ message: "Paper media added successfully!", media: newMedia });
});

app.put("/api/paper-print-media/:slug", upload.single("image"), (req, res) => {
  let mediaList = readJSON(PAPER_MEDIA_FILE);
  const index = mediaList.findIndex((m) => m.slug === req.params.slug);
  if (index === -1) return res.status(404).json({ message: "Media not found" });

  if (req.file) mediaList[index].image = `/uploads/${req.file.filename}`;
  writeJSON(PAPER_MEDIA_FILE, mediaList);
  res.json({ message: "Media updated successfully!", media: mediaList[index] });
});

app.delete("/api/paper-print-media/:slug", (req, res) => {
  let mediaList = readJSON(PAPER_MEDIA_FILE);
  const index = mediaList.findIndex((m) => m.slug === req.params.slug);
  if (index === -1) return res.status(404).json({ message: "Media not found" });

  mediaList.splice(index, 1);
  writeJSON(PAPER_MEDIA_FILE, mediaList);
  res.json({ message: "Media deleted successfully!" });
});

// ------------------
// PHOTO GALLERY (Albums)
// ------------------
app.get("/api/albums", (req, res) => {
  const albums = readJSON(ALBUMS_FILE);
  const summary = albums.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    photoCount: a.photos?.length || 0,
    cover: a.photos?.[0]?.url || null,
  }));
  res.json(summary);
});

app.get("/api/albums/:id", (req, res) => {
  const albums = readJSON(ALBUMS_FILE);
  const album = albums.find((a) => a.id == req.params.id);
  if (!album) return res.status(404).json({ message: "Album not found" });
  res.json(album);
});

app.post("/api/albums", upload.array("photos"), (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ message: "At least one photo is required" });

  let albums = readJSON(ALBUMS_FILE);

  const id = Date.now();
  let slug = slugify(title);
  let count = 1;
  while (albums.find((a) => a.slug === slug)) slug = `${slugify(title)}-${count++}`;

  const photos = req.files.map((file) => ({
    id: Date.now() + Math.random(),
    url: `/uploads/${file.filename}`,
    alt: file.originalname,
  }));

  const newAlbum = { id, title, slug, photos, createdAt: new Date().toISOString() };
  albums.push(newAlbum);
  writeJSON(ALBUMS_FILE, albums);
  res.json({ message: "Album created successfully!", album: newAlbum });
});

// ✅ Updated PUT endpoint
app.put("/api/albums/:id", upload.array("photos"), (req, res) => {
  let albums = readJSON(ALBUMS_FILE);
  const index = albums.findIndex((a) => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Album not found" });

  const { title } = req.body;
  if (title) {
    albums[index].title = title;
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;
    while (albums.find((a, i) => a.slug === slug && i !== index)) slug = `${baseSlug}-${count++}`;
    albums[index].slug = slug;
  }

  if (req.files && req.files.length > 0) {
    const newPhotos = req.files.map((file) => ({
      id: Date.now() + Math.random(),
      url: `/uploads/${file.filename}`,
      alt: file.originalname,
    }));
    albums[index].photos.push(...newPhotos);
  }

  writeJSON(ALBUMS_FILE, albums);
  res.json({ message: "Album updated successfully!", album: albums[index] });
});

app.delete("/api/albums/:id", (req, res) => {
  let albums = readJSON(ALBUMS_FILE);
  const index = albums.findIndex((a) => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Album not found" });

  albums.splice(index, 1);
  writeJSON(ALBUMS_FILE, albums);
  res.json({ message: "Album deleted successfully!" });
});

app.post("/api/albums/:id/photos", upload.single("image"), (req, res) => {
  let albums = readJSON(ALBUMS_FILE);
  const album = albums.find((a) => a.id == req.params.id);
  if (!album) return res.status(404).json({ message: "Album not found" });
  if (!req.file) return res.status(400).json({ message: "Image is required" });

  const newPhoto = {
    id: Date.now(),
    url: `/uploads/${req.file.filename}`,
    alt: req.body.alt || `Photo ${req.file.originalname}`,
  };
  album.photos.push(newPhoto);

  writeJSON(ALBUMS_FILE, albums);
  res.json({ message: "Photo added successfully!", photo: newPhoto });
});

app.delete("/api/albums/:albumId/photos/:photoId", (req, res) => {
  let albums = readJSON(ALBUMS_FILE);
  const album = albums.find((a) => a.id == req.params.albumId);
  if (!album) return res.status(404).json({ message: "Album not found" });

  const photoIndex = album.photos.findIndex((p) => p.id == req.params.photoId);
  if (photoIndex === -1) return res.status(404).json({ message: "Photo not found" });

  album.photos.splice(photoIndex, 1);
  writeJSON(ALBUMS_FILE, albums);
  res.json({ message: "Photo deleted successfully!" });
});

// ------------------
// START SERVER
// ------------------
app.listen(5000, () => console.log("✅ API Server running on: http://localhost:5000"));
