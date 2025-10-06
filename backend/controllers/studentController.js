const db = require('../config/db');
const XLSX = require('xlsx');

// Get student info
exports.getStudentInfo = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// Get monitoring table
exports.getMonitoring = (req, res) => {
  db.query(`SELECT r.id, c.name AS class_name, co.name AS course_name, r.week, r.date, r.topic, r.outcomes, r.students_present 
            FROM reports r
            JOIN classes c ON r.class_id = c.id
            JOIN courses co ON r.course_id = co.id`, (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Search monitoring
exports.searchMonitoring = (req, res) => {
  const { query } = req.query;
  db.query(`SELECT r.id, c.name AS class_name, co.name AS course_name, r.week, r.date, r.topic, r.outcomes, r.students_present 
            FROM reports r
            JOIN classes c ON r.class_id = c.id
            JOIN courses co ON r.course_id = co.id
            WHERE c.name LIKE ? OR co.name LIKE ? OR r.topic LIKE ?`, 
            [`%${query}%`, `%${query}%`, `%${query}%`], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Submit rating
exports.submitRating = (req, res) => {
  const { report_id, student_id, rating } = req.body;
  db.query('INSERT INTO ratings (report_id, user_id, rating) VALUES (?, ?, ?)', [report_id, student_id, rating], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json({ message: 'Rating submitted successfully' });
  });
};

// Export monitoring table to Excel
exports.exportMonitoringExcel = (req, res) => {
  db.query(`SELECT r.id, c.name AS class_name, co.name AS course_name, r.week, r.date, r.topic, r.outcomes, r.students_present 
            FROM reports r
            JOIN classes c ON r.class_id = c.id
            JOIN courses co ON r.course_id = co.id`, (err, result) => {
    if(err) return res.status(500).json(err);

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Monitoring');

    const filePath = './Monitoring.xlsx';
    XLSX.writeFile(workbook, filePath);
    res.download(filePath);
  });
};
