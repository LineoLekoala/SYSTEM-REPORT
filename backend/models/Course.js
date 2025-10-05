const db = require('../config/db');

const Course = {
  create: (course, callback) => {
    const { name, code } = course;
    db.query('INSERT INTO courses (name, code) VALUES (?, ?)', [name, code], callback);
  },
  getAll: (callback) => {
    db.query('SELECT * FROM courses', callback);
  }
};

module.exports = Course;
