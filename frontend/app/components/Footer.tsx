import React from 'react'

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#256269', color: '#ffffff' }}>
      <p>&copy; {new Date().getFullYear()} TheraLink. All rights reserved.</p>
    </footer>
  )
}

export default Footer