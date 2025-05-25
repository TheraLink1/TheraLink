import React from 'react'
import { useState } from 'react';
import { Psychologist } from '../../data/psychologists';
import AccountSettings from './AccountSettings'
import SetAvailability from './SetAvailability';
import Appointments, {Appointment} from './Appointments';

interface Props {
  psychologist: Psychologist;
}

const PsychologistDashboard: React.FC<Props> = ({psychologist}) => {
    // Mock appointments array
    const mockAppointments: Appointment[] = [
      {
        id: 1,
        date: '2025-05-30T09:00:00Z',
        meetingLink: 'https://meet.example.com/abc123',
        status: 'Pending',
        patient: {
          id: 101,
          name: 'Anna Kowalska',
          email: 'anna.kowalska@example.com'
        },
        payment: {
          amount: 150,
          isPaid: false,
          paymentDate: '2025-05-20T08:00:00Z'
        }
      },
      {
        id: 2,
        date: '2025-06-01T11:30:00Z',
        meetingLink: 'https://meet.example.com/xyz789',
        status: 'Pending',
        patient: {
          id: 102,
          name: 'Jan Nowak',
          email: 'jan.nowak@example.com'
        },
        payment: {
          amount: 200,
          isPaid: true,
          paymentDate: '2025-05-22T10:30:00Z'
        }
      },
      {
        id: 3,
        date: '2025-06-05T14:00:00Z',
        meetingLink: 'https://meet.example.com/def456',
        status: 'Approved',
        patient: {
          id: 103,
          name: 'Katarzyna Zielinska',
          email: 'katarzyna.zielinska@example.com'
        },
        payment: {
          amount: 180,
          isPaid: true,
          paymentDate: '2025-05-25T12:00:00Z'
        }
      },
      {
        id: 4,
        date: '2025-06-07T10:00:00Z',
        meetingLink: 'https://meet.example.com/ghi321',
        status: 'Denied',
        patient: {
          id: 104,
          name: 'Marek Wójcik',
          email: 'marek.wojcik@example.com'
        }
      }
    ];

    const [selectedOption, setSelectedOption] = useState<string>('Account Settings');
    const menuItems = ['Account Settings', 'Set Availability', 'Appointments', 'Billings', 'Calendar', 'Ratings'];
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

            <div style={{flex: 1, padding: '20px' ,marginTop: '-20px', backgroundColor: '#ffffff'}}>
                {selectedOption === 'Account Settings' && <AccountSettings psychologist={psychologist}/>}
                {selectedOption === 'Set Availability' && <SetAvailability/>}
                {selectedOption === 'Appointments' && <Appointments appointments={mockAppointments}/>}
            </div>
        </div>
    )
}

export default PsychologistDashboard