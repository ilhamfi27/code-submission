import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState('');

  return { error, setError };
};
