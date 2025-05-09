'use client';

import React from 'react';
import ClientDashboard from '../dashboard/client/ClientDashboard';
import PsychologistDashboard from '../dashboard/psychologist/PsychologistDashboard';

const Dashboard: React.FC = () => {
  const mockUsers = [
    { id: 1, role: 'psychologist', name: 'Dr. Smith' },
    { id: 2, role: 'client', name: 'John Doe' },
  ];

  const user = mockUsers[1]; // change as needed

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1>Dashboard</h1>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden', // ensures children don't overflow rounded corners
        }}
      >

        {/* Main content area */}
        <main
          style={{
            flex: 1,
            padding: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          {user.role === 'psychologist' ? (
            <PsychologistDashboard user={user} />
          ) : (
            <ClientDashboard user={user} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
