'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

export default function LoginPage() {
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    cookies.remove('token', { path: '/' });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (username && password) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success && data.token) {
          sessionStorage.setItem('accessToken', data.token);
          console.log('Login successful');
          router.push('/'); // Redirect to the new page
        } else {
          alert('Login failed: ' + data.message);
        }
      } catch (error) {
        alert('Login request failed');
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='username' name='username' />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}
