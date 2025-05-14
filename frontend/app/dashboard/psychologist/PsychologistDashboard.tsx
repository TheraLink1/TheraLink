import React from 'react'
import { useState } from 'react';
import { Psychologist } from '../../data/psychologists';

interface Props {
  psychologist: Psychologist;
}

const ClientDashboard: React.FC<Props> = ({psychologist}) => {
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
                </ul>
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                {selectedOption === '' && (
                <div>
                    <h1>Welcome, {psychologist.name}!</h1>
                    <p>Select an option from the menu to get started.</p>
                </div>
                )}
                {selectedOption === 'Account Settings' && <h1>Account Settings Section</h1>}
                {selectedOption === 'Appointments' && <h1>Appointments Section</h1>}
                {selectedOption === 'Billings' && <h1>Billings Section</h1>}
            </div>
            </div>
        </div>

    )
}

export default ClientDashboard