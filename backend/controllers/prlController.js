const db = require('../config/db');
const XLSX = require('xlsx');

// Get courses under PRL
exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Get all reports
exports.getReports = (req, res) => {
  db.query('SELECT r.*, u.name AS lecturer_name, c.name AS class_name, co.name AS course_name FROM reports r JOIN users u ON r.lecturer_id=u.id JOIN classes c ON r.class_id=c.id JOIN courses co ON r.course_id=co.id', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Add feedback to a report
exports.addFeedback = (req, res) => {
  const { report_id, feedback } = req.body;
  db.query('UPDATE reports SET prl_feedback=? WHERE id=?', [feedback, report_id], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json({ message: 'Feedback added successfully' });
  });
};

// Get classes
exports.getClasses = (req, res) => {
  db.query('SELECT * FROM classes', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Monitoring table
exports.getMonitoring = (req, res) => {
  db.query('SELECT * FROM reports', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Submit rating
exports.submitRating = (req, res) => {
  const { report_id, user_id, rating } = req.body;
  db.query('INSERT INTO ratings (report_id, user_id, rating) VALUES (?, ?, ?)', [report_id, user_id, rating], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json({ message: 'Rating submitted successfully' });
  });
};

// Search reports
exports.searchReports = (req, res) => {
  const { query } = req.query;
  db.query(`SELECT r.*, u.name AS lecturer_name, c.name AS class_name, co.name AS course_name 
            FROM reports r
            JOIN users u ON r.lecturer_id=u.id
            JOIN classes c ON r.class_id=c.id
            JOIN courses co ON r.course_id=co.id
            WHERE c.name LIKE ? OR co.name LIKE ? OR r.topic LIKE ?`, 
            [`%${query}%`,`%${query}%`,`%${query}%`], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Export reports to Excel
exports.exportReportsExcel = (req, res) => {
  db.query('SELECT r.*, u.name AS lecturer_name, c.name AS class_name, co.name AS course_name FROM reports r JOIN users u ON r.lecturer_id=u.id JOIN classes c ON r.class_id=c.id JOIN courses co ON r.course_id=co.id', (err, result) => {
    if(err) return res.status(500).json(err);

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PRLReports');

    const filePath = './PRLReports.xlsx';
    XLSX.writeFile(workbook, filePath);
    res.download(filePath);
  });
};
