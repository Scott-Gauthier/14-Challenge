// import models
const user = require('./user.js');
const content = require('./content.js');
const comment = require('./comment.js');

// Content belongsTo Users
content.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(content, {
  foreignKey: 'user_id',
});

// Comment belongsTo Content
comment.belongsTo(content, {
  foreignKey: 'content_id',
});
content.hasMany(comment, {
  foreignKey: 'content_id',
});

// Comment belongsTo Users
comment.belongsTo(user, {
  foreignKey: 'user_id',
});
user.hasMany(comment, {
  foreignKey: 'user_id',
});

module.exports = {
  user,
  content,
  comment,
}