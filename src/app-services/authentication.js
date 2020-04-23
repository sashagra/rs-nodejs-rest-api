const router = require('express').Router();
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../resources/users/user.model');

router
  .route('/')
  .get((req, res) => {
    res.status(401).send('Note Authorize');
  })
  .post(async (req, res) => {
    const employee = await User.findOne({
      login: req.body.login
    });
    if (employee) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        employee.password
      );
      if (isPasswordCorrect) {
        const payload = { sub: employee.id, login: employee.login };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 * 60 });
        res.send({ token });
      } else {
        res.status(403).send('Incorrect login or password');
      }
    } else {
      res.status(403).send('Incorrect login or password');
    }
  });

const loginAccess = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // eslint-disable-next-line no-unused-vars
    jwt.verify(token.split(' ')[1], JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Not authorize');
      }
      next();
    });
  } else {
    return res.status(401).send('Not authorize');
  }
};

module.exports = { loginRouter: router, loginAccess };
