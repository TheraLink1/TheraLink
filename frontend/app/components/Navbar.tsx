import Link from 'next/link';
import React from 'react'

const Navbar = () => {
    const user = 0; // Change to 1 to simulate logged-in state

    return (
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#256269' }}>
                <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white', textDecoration: 'none' }}>TheraLink</Link>
                <div>
                    {user ? (
                        <>
                            <button style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px' }}>Profile</button>
                            <button style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px' }}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/signup" style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}>Sign Up</Link>
                            <Link href="/signin" style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: '#256269', border: 'none', borderRadius: '4px', textDecoration: 'none', display: 'inline-block' }}>Sign In</Link>
                        </>
                    )}
                </div>
            </nav>
        );
}

export default Navbar