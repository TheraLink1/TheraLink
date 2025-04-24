'use client';

import React from 'react';
import ClientDashboard from '../dashboard/client/ClientDashboard'; // Adjust the import path as needed
import PsychologistDashboard from '../dashboard/psychologist/PsychologistDashboard'; // Adjust the import path as needed

const Dashboard = () => {
    const mockUsers = [
        { id: 1, role: 'psychologist', name: 'Dr. Smith' },
        { id: 2, role: 'client', name: 'John Doe' },
    ];

    const user = mockUsers[1]; // change if needed 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                <h1>Dashboard</h1>
            </header>
            <div style={{ flex: 1, padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <main style={{ flex: 1, display: 'flex', gap: '20px', padding: '20px' }}>
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
