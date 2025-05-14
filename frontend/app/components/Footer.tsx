import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '2rem', backgroundColor: '#256269', color: '#ffffff' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Company Info */}
        <div style={{ flex: '1', minWidth: '250px', marginBottom: '1rem' }}>
          <h3>TheraLink</h3>
          <p>Connecting people with trusted mental health professionals.</p>
        </div>

        {/* Navigation */}
        <div style={{ flex: '1', minWidth: '250px', marginBottom: '1rem' }}>
          <h4>Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
            <li><a href="/terms" style={linkStyle}>Terms of Service</a></li>
            <li><a href="/privacy" style={linkStyle}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1', minWidth: '250px', marginBottom: '1rem' }}>
          <h4>Contact</h4>
          <p>Email: support@theralink.com</p>
          <p>Phone: +48 123 456 789</p>
          <p>Address: ul. Przykładowa 1, Warszawa</p>
        </div>
      </div>

      {/* Bottom Note */}
      <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #ffffff33', paddingTop: '1rem' }}>
        <p>&copy; {new Date().getFullYear()} TheraLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

const linkStyle: React.CSSProperties = {
  color: '#ffffff',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',
};

export default Footer;
