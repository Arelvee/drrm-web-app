import express from "express";
import multer from "multer";
import fs from "fs"; 
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json()); 

const uploadDir = path.join(__dirname, "assets/uploads");
const receiptDir = path.join(uploadDir, "receipts");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(receiptDir)) {
  fs.mkdirSync(receiptDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static(uploadDir));

app.post("/upload", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.json({ imageUrls }); 
});

app.post("/upload", upload.single("images"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrls: [imageUrl] });
});


const receiptStorage = multer.diskStorage({
  destination: receiptDir, 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const receiptUpload = multer({ storage: receiptStorage });

app.post("/upload-receipt", receiptUpload.single("receipt"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No receipt uploaded" });
  }

  const receiptUrl = `/uploads/receipts/${req.file.filename}`;
  res.json({ receiptUrl });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
