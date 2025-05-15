// ClientDashboard.tsx
import React, { useState } from 'react';
import VerifyForm from './VerifyForm';
import AccountSettings from './AccountSettings';
import AppointmentHistory, { Appointment } from './AppointmentHistory'; // <-- import typu

interface ClientDashboardProps {
  user: {
    id: number;
    role: string;
    name: string;
    email: string;
  };
}

// ② użycie typu Appointment
const sampleAppointments: Appointment[] = [
  {
    id: 1,
    date: '2025-05-10T10:00:00Z',
    meetingLink: 'https://meet.example.com/session1',
    status: 'Approved',
    psychologist: { id: 1, name: 'Dr. Anna Nowak', email: 'anna@example.com' },
    payment: {
      amount: 200,
      isPaid: true,
      paymentDate: '2025-05-09T14:30:00Z',
    },
  },
  {
    id: 2,
    date: '2025-04-22T14:30:00Z',
    meetingLink: 'https://meet.example.com/session2',
    status: 'Denied',
    psychologist: { id: 2, name: 'Dr. Tomasz Kowalski', email: 'tomasz@example.com' },
  },
];

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user }) => {
  const [selectedOption, setSelectedOption] = useState<string>('Account Settings');

  const menuItems = ['Account Settings', 'Appointments', 'Billings', 'Verify'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
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

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {selectedOption === 'Account Settings' && <AccountSettings user={user} />}
        {selectedOption === 'Appointments' && (
          <AppointmentHistory appointments={sampleAppointments} />
        )}
        {selectedOption === 'Billings' && <h1>Billings Section</h1>}
        {selectedOption === 'Verify' && <VerifyForm />}
      </div>
    </div>
  );
};

export default ClientDashboard;