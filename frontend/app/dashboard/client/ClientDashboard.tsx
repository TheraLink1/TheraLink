import React from 'react'
import { useState } from 'react';
import VerifyForm from './VerifyForm';
import AccountSettings from './AccountSettings';
interface ClientDashboardProps {
    user: {
        id: number;
        role: string;
        name: string;
        email: string;
    };
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user }) => {
     const [selectedOption, setSelectedOption] = useState<string>('');
        return (
            <div>
                <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
                    <h2>Menu</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ margin: '10px 0' }}>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }} onClick={() => setSelectedOption('Account Settings')}>Account Settings</a>
                    </li>
                    <li style={{ margin: '10px 0' }}>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }} onClick={() => setSelectedOption('Appointments')}>Appointments</a>
                    </li>
                    <li style={{ margin: '10px 0' }}>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }} onClick={() => setSelectedOption('Billings')}>Billings</a>
                    </li>
                    {/* Lead to a form to verify and become a psychologist */}
                    <li style={{ margin: '10px 0' }}>
                        <a href="#" style={{ textDecoration: 'none', color: '#333' }} onClick={() => setSelectedOption('Verify')}>Verify</a>
                    </li>
                    </ul>
                </div>
                <div style={{ flex: 1, padding: '20px' }}>
                    {selectedOption === '' && (
                    <div>
                        <h1>Welcome, {user.name}!</h1>
                        <p>Select an option from the menu to get started.</p>
                    </div>
                    )}
                    {selectedOption === 'Account Settings' && (
                        <AccountSettings user={user} />
                        )}

                    {selectedOption === 'Appointments' && <h1>Appointments Section</h1>}
                    {selectedOption === 'Billings' && <h1>Billings Section</h1>}
                    {selectedOption === 'Verify' && <VerifyForm />}
                </div>
                </div>
            </div>
        )
}

export default ClientDashboard