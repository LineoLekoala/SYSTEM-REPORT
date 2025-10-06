const express = require('express');
const router = express.Router();
const { addCourse, assignLecturer, getCourses, getReports, getClasses, getLecturers, getMonitoring, submitRating, searchReports, exportReportsExcel } = require('../controllers/plController');

// Courses management
router.post('/courses', addCourse);
router.get('/courses', getCourses);

// Assign lecturer to course/module
router.post('/courses/assign', assignLecturer);

// Get all reports from PRL
router.get('/reports', getReports);

// Get all classes
router.get('/classes', getClasses);

// Get all lecturers
router.get('/lecturers', getLecturers);

// Monitoring table
router.get('/monitoring', getMonitoring);

// Submit rating
router.post('/rating', submitRating);

// Search reports
router.get('/reports/search', searchReports);

// Export reports to Excel
router.get('/reports/export', exportReportsExcel);

module.exports = router;
