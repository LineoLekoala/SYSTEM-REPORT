import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import LecturerReportForm from '../LecturerReportForm';

function LecturerDashboard() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Mock API call
    // api.get('/lecturer/classes').then(res => setClasses(res.data));
    setClasses([
      { id: 1, name: 'IT101', students: 30 },
      { id: 2, name: 'IT102', students: 25 },
    ]);
  }, []);

  return (
    <div>
      <h3>Lecturer Dashboard</h3>
      <p>View your classes and submit weekly reports:</p>
      <ul>
        {classes.map(cls => (
          <li key={cls.id}>{cls.name} - {cls.students} students</li>
        ))}
      </ul>

      <h4>Submit Lecture Report</h4>
      <LecturerReportForm />
    </div>
  );
}

export default LecturerDashboard;
