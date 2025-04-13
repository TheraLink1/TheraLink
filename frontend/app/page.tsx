import React from 'react';

const page = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', backgroundColor: '#00bfa5', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Znajdź lekarza i umów wizytę</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Szukaj wśród 146 000 lekarzy.</p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#fff', color: '#00bfa5', border: 'none', borderRadius: '5px' }}>W gabinecie</button>
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#fff', color: '#00bfa5', border: 'none', borderRadius: '5px' }}>Online</button>
          </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
            <input type="text" placeholder="specjalizacja, badanie lub nazwisko" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }} />
            <input type="text" placeholder="Warszawa" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '200px' }} />
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: 'white', color: '#296259', border: 'none', borderRadius: '5px' }}>Szukaj</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default page;