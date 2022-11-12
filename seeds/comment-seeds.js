const { comment } = require('../models');

const commentData = [

    {comment: 'This is stupid 1!', content_id: 1, user_id: 2,},
    {comment: 'This is amazing 1!', content_id: 1, user_id: 1,},
    {comment: 'This is stupid 2!', content_id: 2, user_id: 2,},
    {comment: 'This is amazing 2!', content_id: 2, user_id: 1,},
    {comment: 'This is stupid 3!', content_id: 3, user_id: 1,},
    {comment: 'This is amazing 3!', content_id: 3, user_id: 2,},

];

const seedComment = () => comment.bulkCreate(commentData);

module.exports = seedComment;
