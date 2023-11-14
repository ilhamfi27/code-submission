import { api } from '@/service/backend';
import { useState } from 'react';

interface UserInterface {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserInterface>({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const login = async () => {
    return api.post('/auth/login', {
      username: user.username,
      password: user.password,
    });
  };

  const register = async () => {
    return api.post('/auth/register', {
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  };

  return { login, register, setUser, user };
};
