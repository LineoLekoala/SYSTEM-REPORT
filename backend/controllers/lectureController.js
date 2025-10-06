const db = require('../config/db');
const XLSX = require('xlsx');

// Get classes assigned to lecturer
exports.getClasses = (req, res) => {
  db.query('SELECT * FROM classes', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Submit a report
exports.submitReport = (req, res) => {
  const { lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, studentsPresent } = req.body;
  db.query('INSERT INTO reports (lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, students_present) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, studentsPresent],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Report submitted successfully' });
    }
  );
};

// Get all reports by lecturer
exports.getReports = (req, res) => {
  db.query('SELECT r.*, c.name AS class_name, co.name AS course_name FROM reports r JOIN classes c ON r.class_id=c.id JOIN courses co ON r.course_id=co.id WHERE r.lecturer_id=?', 
    [req.query.lecturer_id], (err, result) => {
      if(err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Search reports
exports.searchReports = (req, res) => {
  const { query } = req.query;
  db.query(`SELECT r.*, c.name AS class_name, co.name AS course_name 
            FROM reports r
            JOIN classes c ON r.class_id=c.id
            JOIN courses co ON r.course_id=co.id
            WHERE c.name LIKE ? OR co.name LIKE ? OR r.topic LIKE ?`, 
            [`%${query}%`, `%${query}%`, `%${query}%`], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Lecturer monitoring
exports.getMonitoring = (req, res) => {
  db.query('SELECT * FROM reports', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
};

// Submit rating
exports.submitRating = (req, res) => {
  const { report_id, lecturer_id, rating } = req.body;
  db.query('INSERT INTO ratings (report_id, user_id, rating) VALUES (?, ?, ?)', [report_id, lecturer_id, rating], (err, result) => {
    if(err) return res.status(500).json(err);
    res.json({ message: 'Rating submitted successfully' });
  });
};

// Export reports to Excel
exports.exportReportsExcel = (req, res) => {
  db.query('SELECT r.*, c.name AS class_name, co.name AS course_name FROM reports r JOIN classes c ON r.class_id=c.id JOIN courses co ON r.course_id=co.id', (err, result) => {
    if(err) return res.status(500).json(err);

    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    const filePath = './LecturerReports.xlsx';
    XLSX.writeFile(workbook, filePath);
    res.download(filePath);
  });
};
