import React from 'react'
import { useState } from 'react';
import { Psychologist } from '../../data/psychologists';
import AccountSettings from './AccountSettings'

interface Props {
  psychologist: Psychologist;
}

const PsychologistDashboard: React.FC<Props> = ({psychologist}) => {
    const [selectedOption, setSelectedOption] = useState<string>('Account Settings');
    const menuItems = ['Account Settings', 'Set Availability', 'Appointments', 'Billings', 'Location', 'Calendar', 'Ratings'];
    return (
        <div style={{display: 'flex', minHeight: '100vh'}}>
            <div style={{
                width: '250px',
                backgroundColor: '#f4f4f4',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {menuItems.map(item => (
                    <li key={item} style={{ margin: '10px 0' }}>
                    <a
                        href="#"
                        onClick={e => { e.preventDefault(); setSelectedOption(item); }}
                        style={{
                        textDecoration: 'none',
                        color: selectedOption === item ? '#2b6369' : '#333',
                        fontWeight: selectedOption === item ? 'bold' : 'normal',
                        }}
                    >
                        {item}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            <div style={{flex: 1, padding: '20px'}}>
                {selectedOption === 'Account Settings' && <AccountSettings psychologist={psychologist}/>}
            </div>
        </div>
    )
}

export default PsychologistDashboard