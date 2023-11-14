import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const hashPassword = (password: string, saltOrRounds = 10) => {
  const salt = genSaltSync(saltOrRounds);
  const hash = hashSync(password, salt);
  return hash;
};

export const comparePassword = (hash: string, password: string) => {
  const isMatch = compareSync(password, hash);
  return isMatch;
};
