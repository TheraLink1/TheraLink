import React from 'react'

const Navbar = () => {
    const user = 0; // Change to 1 to simulate logged-in state

    return (
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#256269' }}>
                <a href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white', textDecoration: 'none' }}>TheraLink</a>
                <div>
                    {user ? (
                        <>
                            <button style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px' }}>Profile</button>
                            <button style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px' }}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <a href="/signup" style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}>Sign Up</a>
                            <a href="/signin" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}>Sign In</a>
                        </>
                    )}
                </div>
            </nav>
        );
}

export default Navbar