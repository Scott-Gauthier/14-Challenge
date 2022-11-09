const seedUser = require('./user-seeds');
const seedContent = require('./content-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USER SEEDED -----\n');
  
  await seedContent();
  console.log('\n----- CONTENT SEEDED -----\n');


  process.exit(0);
};

seedAll();