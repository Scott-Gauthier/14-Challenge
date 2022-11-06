const { User } = require('../models');

const userData = [
  {
    name: 'Scott',
    email: 'scott@gmail.com',
    password: "password"
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com',
    password: "password"

  }
];

const seedUser = () => User.bulkCreate(userData,{
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
