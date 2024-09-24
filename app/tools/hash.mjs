import crypto from 'crypto'

const pepper = process.env.PEPPER;

export const random = () => { return crypto.randomBytes(64).toString('base64')}

export const authentication = (password, salt, pepper) => {
  const hash = crypto.createHash('sha256');
  hash.update(salt + password + pepper);
  return hash.digest('hex');
};
