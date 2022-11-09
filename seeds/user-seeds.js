const { user } = require('../models');

const userData = [
  {
    email: 'scott@gmail.com',
    password: "password",
  },
  {
    email: 'bob@gmail.com',
    password: "password",
  }
];

const seedUser = () => user.bulkCreate(userData,{
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;
