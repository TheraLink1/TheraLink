'use client';

import React from 'react';
import { useGetAuthUserQuery } from '@/state/api';
import ClientDashboard from '../dashboard/client/ClientDashboard';
import PsychologistDashboard from '../dashboard/psychologist/PsychologistDashboard';

const Dashboard: React.FC = () => {
  // Fetch auth user
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authUser || !authUser.userRole) {
    // Redirect to sign-in page if not authenticated
    if (typeof window !== 'undefined') window.location.href = '/signin';
    return null;
  }

  const { userRole, userInfo } = authUser;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <main
          style={{
            flex: 1,
            padding: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          {userRole === 'psychologist' ? (
            <PsychologistDashboard psychologist={userInfo} />
          ) : userRole === 'client' ? (
            <ClientDashboard user={userInfo} />
          ) : (
            <div>No dashboard available for your role.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;