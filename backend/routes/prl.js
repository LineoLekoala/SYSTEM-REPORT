const express = require('express');
const router = express.Router();
const { getCourses, getReports, addFeedback, getClasses, getMonitoring, submitRating, searchReports, exportReportsExcel } = require('../controllers/prlController');

// Get courses under PRL
router.get('/courses', getCourses);

// Get reports from lecturers
router.get('/reports', getReports);

// Add feedback to a report
router.post('/reports/feedback', addFeedback);

// Get classes under PRL
router.get('/classes', getClasses);

// Monitoring table
router.get('/monitoring', getMonitoring);

// Submit rating
router.post('/rating', submitRating);

// Search reports
router.get('/reports/search', searchReports);

// Export reports to Excel
router.get('/reports/export', exportReportsExcel);

module.exports = router;
