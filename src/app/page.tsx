'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react';
import Cookies from 'universal-cookie';

export default function Home() {
  const auth = useAuth();

  const linkStyle = {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'blue',
    cursor: 'pointer',
  };

  const navStyle = {
    marginBottom: '20px',
  };

  const renderLinks = () => {
    if (auth.token) {
      switch (auth.role) {
        case 'PersonalTrainer':
          return (
            <>
              <Link href='/personalTrainer' style={linkStyle}>
                List Page
              </Link>
              <Link href='personalTrainer/addclient' style={linkStyle}>
                Create Client
              </Link>
              <Link
                href='/personalTrainer/createNewWorkoutProgram'
                style={linkStyle}
              >
                Create Workout Program
              </Link>

              {/* <Link href="/list-workout-programs" style={linkStyle}>
                List of Workout Programs
              </Link>
              <Link href="/view-workout-program" style={linkStyle}>
                View Specific Workout Program
              </Link>
              <Link href="/list-clients" style={linkStyle}>
                List of Clients
              </Link> */}
            </>
          );
        case 'Manager':
          return (
            <Link href='/create-personal-trainer' style={linkStyle}>
              Create personal trainers
            </Link>
          );
        case 'Client':
          return (
            <Link href='/view-workout-program' style={linkStyle}>
              See workout program
            </Link>
          );
        default:
          return null;
      }
    } else {
      return (
        <Link href='/Login' style={linkStyle}>
          Login
        </Link>
      );
    }
  };

  return (
    <>
      <h1>{auth.token ? `Welcome ${auth.role}` : 'Welcome Guest'}</h1>
      <header>
        <nav style={navStyle}>
          {renderLinks()}
          {auth.token && (
            <Link href='/Login' style={linkStyle}>
              Logout
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}
