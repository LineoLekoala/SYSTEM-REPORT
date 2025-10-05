const db = require('../config/db');

const Class = {
  create: (cls, callback) => {
    const { name, faculty, venue, scheduledTime, totalStudents } = cls;
    db.query(
      'INSERT INTO classes (name, faculty, venue, scheduled_time, total_students) VALUES (?, ?, ?, ?, ?)',
      [name, faculty, venue, scheduledTime, totalStudents],
      callback
    );
  },
  getAll: (callback) => {
    db.query('SELECT * FROM classes', callback);
  }
};

module.exports = Class;
