const express = require('express');
const router = express.Router();
const { getStudentInfo, getMonitoring, submitRating, searchMonitoring, exportMonitoringExcel } = require('../controllers/studentController');

// Get student info
router.get('/:id', getStudentInfo);

// Monitoring table
router.get('/monitoring', getMonitoring);

// Search monitoring
router.get('/monitoring/search', searchMonitoring);

// Submit rating
router.post('/rating', submitRating);

// Export monitoring table to Excel
router.get('/monitoring/export', exportMonitoringExcel);

module.exports = router;
