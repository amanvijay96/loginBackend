const models = require('../models/users');
const validation = require('../utils/validation');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const loginUser = async function(req, res, next) {
  console.log('hi')
  const request = validation.loginValidation.validate(req.body);
  if (request.error) {
    next({ message: request.error.details[0].message, statusCode: 400 });
  } else {
    const validUser = await models.users.findOne({
      where: { username: req.body.username }
    });
    if (!validUser) {
      res.status(400).send('Username not found');
      next({ message: 'Username not found', statusCode: 400 });
    }
    const validPassword = await models.users.compare(
      req.body.password,
      validUser.password
    );
    if (!validPassword) {
      res.status(400).send('Invalid password');
      next({ message: 'Invalid password', statusCode: 400 });
    }
    res.send('Login Success');
  }
};


module.exports = {
  loginUser
};
