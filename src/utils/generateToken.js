import jwt from 'jsonwebtoken';

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, {
  expiresIn: '30000d',
});

export default generateToken;
