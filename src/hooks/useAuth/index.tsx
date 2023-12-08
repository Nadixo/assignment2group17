'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });
  const jwtDecode = require('jwt-decode');

  const getVerifiedToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('token') ?? null;

    if (token) {
      try {
        const decoded = jwt.decode(token);
        //No need to verify token here, since this is client side
        if (decoded && typeof decoded === 'object') {
          setAuth({ token, role: decoded.Role });
          console.log('token ', token);
        }
        console.log('bypassed?');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  useEffect(() => {
    getVerifiedToken();
  }, []);

  return auth;
}
type AuthState = {
  token: string | null;
  role: 'PersonalTrainer' | 'Manager' | 'Client' | null;
};
