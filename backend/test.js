const {
  pbkdf2Sync,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} = require('crypto');

const hashPassword = (password, saltOrRounds = 16) => {
  const salt = randomBytes(saltOrRounds).toString('hex');
  console.log(salt);
  const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash;
};

const comparePassword = (storedPassword, password) => {
  console.log(storedPassword);
  const [hashedPassword, salt] = storedPassword.split('.');
  console.log(salt);
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = scryptSync(password, salt, 64);
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
};

async function main() {
  const pass = 'ilhamfadhilah';
  const hash = hashPassword(pass);
  const isMatch = comparePassword(hash, 'pass');
  console.log(isMatch);
}

main();
