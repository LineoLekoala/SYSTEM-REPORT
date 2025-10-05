import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function PRLDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Mock API call
    // api.get('/prl/reports').then(res => setReports(res.data));
    setReports([
      { id: 1, lecturer: 'John Doe', class: 'IT101', status: 'Pending', feedback: '' },
      { id: 2, lecturer: 'Jane Smith', class: 'IT102', status: 'Reviewed', feedback: 'Good lecture' },
    ]);
  }, []);

  return (
    <div>
      <h3>PRL Dashboard</h3>
      <p>Review lecturer reports and add feedback:</p>
      <table className="table">
        <thead>
          <tr>
            <th>Lecturer</th>
            <th>Class</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.lecturer}</td>
              <td>{r.class}</td>
              <td>{r.status}</td>
              <td>{r.feedback || 'No Feedback'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PRLDashboard;
