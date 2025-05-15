'use client';
import { useGetAuthUserQuery } from '@/state/api';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'aws-amplify/auth';

const Navbar = () => {
  const logoPath = 'favicon.ico';
  const { data: authUser } = useGetAuthUserQuery();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#256269',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',  // ← subtle shadow
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={logoPath}
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
        </Link>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.3rem',
              color: 'white',
              fontWeight: 600,
            }}
          >
            TheraLink
          </div>
          <div
            style={{
              fontSize: '1.3rem',
              color: '#cde8e5',
              marginLeft: '10px',
            }}
          >
            The help you deserve
          </div>
        </div>
      </div>

      <div>
        {authUser ? (
          <>
            <Link
              href="/profile"
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#256269',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#256269',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/signup"
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#256269',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Sign Up
            </Link>
            <Link
              href="/signin"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#256269',
                border: 'none',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
