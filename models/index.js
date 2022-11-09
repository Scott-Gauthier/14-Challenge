// import models
const user = require('./user.js');
const content = require('./content.js');

// Content belongsTo Users
content.belongsTo(user, {
  foreignKey: 'user_id',
});

module.exports = {
  user,
  content
}