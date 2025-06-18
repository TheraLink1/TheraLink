import React, { useState } from 'react';
import VerifyForm from './VerifyForm';
import AccountSettings from './AccountSettings';
import AppointmentHistory from './AppointmentHistory'; 
import { CardInfo, PaymentRecord } from './Billings';
import Billings from './Billings'; 
import { useGetAppointmentsForClientQuery, useGetAuthUserQuery } from '@/state/api';

interface ClientDashboardProps {
  user: {
    id: number;
    role: string;
    name: string;
    email: string;
  };
}

const sampleCard: CardInfo = {
  brand: 'Visa',
  last4: '4242',
  expiry: '12/26',
  cardholder: 'Jan Kowalski',
};

const samplePayments: PaymentRecord[] = [
  { id: 1, date: '2025-05-01T12:00:00Z', amount: 200, status: 'Paid' },
  { id: 2, date: '2025-04-15T09:30:00Z', amount: 150, status: 'Not payed' },
];

const ClientDashboard: React.FC<ClientDashboardProps> = ({ user }) => {
  const [selectedOption, setSelectedOption] = useState<string>('Account Settings');

  const { data: authUser } = useGetAuthUserQuery();
  const cognitoId = authUser?.userInfo?.cognitoId || '';

  const { data: appointments, isLoading: appointmentsLoading } = useGetAppointmentsForClientQuery(cognitoId, {
    skip: !cognitoId,
  });

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
        {selectedOption === 'Appointments' && <AppointmentHistory />}
        {selectedOption === 'Billings' && <Billings userName={user.name} cardInfo={sampleCard} payments={samplePayments} />}
        {selectedOption === 'Verify' && <VerifyForm />}
      </div>
    </div>
  );
};

export default ClientDashboard;