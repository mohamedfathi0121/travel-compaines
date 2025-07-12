// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // Adjust path if needed

export const useAuth = () => {
  return useContext(AuthContext);
};