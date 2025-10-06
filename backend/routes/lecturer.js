const express = require('express');
const router = express.Router();
const { getClasses, getReports, submitReport, getMonitoring, submitRating, searchReports, exportReportsExcel } = require('../controllers/lecturerController');

// Classes assigned to lecturer
router.get('/classes', getClasses);

// Submit a report
router.post('/reports', submitReport);

// Get all reports by this lecturer
router.get('/reports', getReports);

// Search reports
router.get('/reports/search', searchReports);

// Lecturer monitoring
router.get('/monitoring', getMonitoring);

// Submit rating
router.post('/rating', submitRating);

// Export reports to Excel
router.get('/reports/export', exportReportsExcel);

module.exports = router;
