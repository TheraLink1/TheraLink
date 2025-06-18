import React from 'react'
import { useState } from 'react';
import { Psychologist } from '../../data/psychologists';
import AccountSettings from './AccountSettings'
import SetAvailability from './SetAvailability';
import Appointments from './Appointments';
import Billings from './Billings'; 
import CalendarContainer from './CalendarContainer';
import Ratings from './Ratings';
import { useGetAvailabilitiesForPsychologistQuery, useGetAppointmentsForPsychologistQuery } from '@/state/api';

interface Props {
  psychologist: Psychologist;
}

const PsychologistDashboard: React.FC<Props> = ({psychologist}) => {
    const { data: availabilities, isLoading: isLoadingAvailabilities } = useGetAvailabilitiesForPsychologistQuery(psychologist.id);
    const { data: appointments, isLoading: isLoadingAppointments } = useGetAppointmentsForPsychologistQuery(psychologist.id.toString());

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
                {selectedOption === 'Set Availability' && <SetAvailability />}
                {selectedOption === 'Appointments' && (
                  isLoadingAppointments ? <p>Loading appointments...</p> : <Appointments appointments={appointments || []} />
                )}
                {selectedOption === 'Billings' && (
                  isLoadingAppointments ? <p>Loading appointments...</p> : <Billings appointments={appointments || []} />
                )}
                {selectedOption === 'Calendar' && (
                  (isLoadingAvailabilities || isLoadingAppointments) ? <p>Loading calendar data...</p> : <CalendarContainer />
                )}
                {selectedOption === 'Ratings' && <Ratings />}
            </div>
        </div>
    )
}

export default PsychologistDashboard