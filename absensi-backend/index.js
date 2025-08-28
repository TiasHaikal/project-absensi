const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup multer untuk simpan foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});
const upload = multer({ storage });

// API create attendance
app.post("/attendance", upload.single("photo"), async (req, res) => {
  const { name, latitude, longitude } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : "";

  const attendance = await prisma.attendance.create({
    data: {
      name,
      photo,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  });

  res.json(attendance);
});

// API get all attendance (rekap)
app.get("/attendance", async (req, res) => {
  const records = await prisma.attendance.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(records);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
