'use client';

import React from 'react';
import { useGetAuthUserQuery } from '@/state/api';
import ClientDashboard from '../dashboard/client/ClientDashboard';
import PsychologistDashboard from '../dashboard/psychologist/PsychologistDashboard';
import {mockPsychologists } from '../data/psychologists';

const Dashboard: React.FC = () => {
  // Fetch auth user

  const { data: authUser } = useGetAuthUserQuery();
  if (!authUser) {
    // Redirect to sign-in page if not authenticated
    window.location.href = '/signin';
  }

  // get user data
  const authuser = authUser?authUser : null;

  //mock the psychologist data using the first psychologist from the list psychologists in psychologist.ts
  const mockPsychologist = mockPsychologists.find((p) => p.id === 1) || null;

  // mock the ordinary client
  const mockUser = {
    id: 1,
    name: 'Andrzej Tatowski',
    email: 'andrzejt8@gmail.com',
    role: 'client',
  }

  const chosenPsychologist = true  //mock the user (client or psychologist)
  
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
          {chosenPsychologist ? (
            mockPsychologist ? (
              <PsychologistDashboard psychologist={mockPsychologist} />
            ) : (
              <div>No psychologist data available.</div>
            )
          ) : (
            <ClientDashboard user={mockUser} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
