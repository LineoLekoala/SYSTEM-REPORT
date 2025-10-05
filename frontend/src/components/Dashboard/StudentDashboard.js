import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function StudentDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Mock API call (replace with actual API)
    // api.get('/student/reports').then(res => setReports(res.data));
    setReports([
      { id: 1, class: 'IT101', topic: 'HTML Basics', status: 'Submitted', rating: 4 },
      { id: 2, class: 'IT102', topic: 'CSS Styling', status: 'Pending', rating: null },
    ]);
  }, []);

  return (
    <div>
      <h3>Student Dashboard</h3>
      <p>Monitor your lectures and submit ratings:</p>
      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Topic</th>
            <th>Status</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.class}</td>
              <td>{r.topic}</td>
              <td>{r.status}</td>
              <td>{r.rating ?? 'Not Rated'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
