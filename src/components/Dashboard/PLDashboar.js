import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function PLDashboard() {
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Mock API call
    // api.get('/pl/lecturers').then(res => setLecturers(res.data));
    // api.get('/pl/courses').then(res => setCourses(res.data));
    setLecturers([
      { id: 1, name: 'Dr. Smith', classes: 3 },
      { id: 2, name: 'Prof. Brown', classes: 2 },
    ]);
    setCourses([
      { id: 1, name: 'Diploma in IT' },
      { id: 2, name: 'BSc Business IT' },
    ]);
  }, []);

  return (
    <div>
      <h3>PL Dashboard</h3>
      <p>Manage lecturers and courses:</p>
      <h5>Lecturers</h5>
      <ul>
        {lecturers.map(l => (
          <li key={l.id}>{l.name} - {l.classes} classes</li>
        ))}
      </ul>
      <h5>Courses</h5>
      <ul>
        {courses.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PLDashboard;
