// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import LecturerDashboard from './LecturerDashboard';
import PRLDashboard from './PRLDashboard';
import StudentDashboard from './StudentDashboard';

function Dashboard() {
  const [userRole, setUserRole] = useState('student'); // default role

  const renderDashboard = () => {
    switch (userRole) {
      case 'student':
        return <StudentDashboard />;
      case 'lecturer':
        return <LecturerDashboard />;
      case 'prl':
        return <PRLDashboard />;
      default:
        return <h3>Welcome to System Report</h3>;
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="roleSelect">Select Role:</label>
        <select
          id="roleSelect"
          className="form-select"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="prl">PRL</option>
        </select>
      </div>

      {renderDashboard()}
    </div>
  );
}

export default Dashboard;
