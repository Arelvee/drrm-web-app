import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // Ensure CORS is enabled

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Set storage engine (uploads go to 'assets/uploads' at project root)
const storage = multer.diskStorage({
  destination: path.join(__dirname, "assets/uploads"), // Corrected path
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static files for retrieving images
app.use("/uploads", express.static(path.join(__dirname, "assets/uploads"))); // Updated path

// Upload route
app.post("/upload", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const imageUrls = req.files.map(file => `/uploads/${file.filename}`); // Create correct image URLs
  res.json({ imageUrls }); // Send array of URLs back
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
