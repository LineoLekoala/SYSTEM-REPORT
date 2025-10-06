const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. Connect to MySQL Database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "luct_db"
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL Database connected successfully!");
  }
});

// ✅ 2. Default Route
app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

// ✅ 3. Lecturer Report Submission Endpoint (Example)
app.post("/api/reports/submit", (req, res) => {
  const {
    faculty_name,
    class_name,
    week_number,
    lecture_date,
    course_name,
    course_code,
    lecturer_name,
    students_present,
    total_students,
    venue,
    scheduled_time,
    topic_taught,
    learning_outcomes,
    recommendations
  } = req.body;

  const sql = `
    INSERT INTO lecturer_reports 
    (faculty_name, class_name, week_number, lecture_date, course_name, course_code, lecturer_name, students_present, total_students, venue, scheduled_time, topic_taught, learning_outcomes, recommendations)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    faculty_name, class_name, week_number, lecture_date, course_name, course_code,
    lecturer_name, students_present, total_students, venue, scheduled_time,
    topic_taught, learning_outcomes, recommendations
  ], (err, result) => {
    if (err) {
      console.error("❌ Error inserting report:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "✅ Report submitted successfully!" });
  });
});

// ✅ 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
