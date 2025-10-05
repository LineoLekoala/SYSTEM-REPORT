const express = require('express');
const router = express.Router();
const db = require('../config/db'); // your db connection

// Submit report
router.post('/submit', (req, res) => {
    const {
        faculty_name, class_name, week_number, lecture_date, 
        course_name, course_code, lecturer_name, students_present,
        total_students, venue, scheduled_time, topic_taught,
        learning_outcomes, recommendations
    } = req.body;

    const sql = `INSERT INTO lecturer_reports
    (faculty_name, class_name, week_number, lecture_date, course_name, course_code, lecturer_name, students_present, total_students, venue, scheduled_time, topic_taught, learning_outcomes, recommendations)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [faculty_name, class_name, week_number, lecture_date, course_name, course_code, lecturer_name, students_present, total_students, venue, scheduled_time, topic_taught, learning_outcomes, recommendations], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ message: "Report submitted successfully!" });
    });
});

module.exports = router;
