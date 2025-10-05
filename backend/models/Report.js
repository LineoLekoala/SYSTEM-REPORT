const db = require('../config/db');

const Report = {
  create: (report, callback) => {
    const { lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, studentsPresent } = report;
    db.query(
      'INSERT INTO reports (lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, students_present) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [lecturer_id, course_id, class_id, week, date, topic, outcomes, recommendations, studentsPresent],
      callback
    );
  },
  getAll: (callback) => {
    db.query('SELECT * FROM reports', callback);
  }
};

module.exports = Report;
