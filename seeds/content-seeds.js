const { content } = require('../models');

const contentData = [

    {title: 'test title 1', content:'random idea 1'},
    {title: 'test title 2', content:'random idea 2'},
    {title: 'test title 3', content:'random idea 3'}

];

const seedBooks = () => content.bulkCreate(contentData);

module.exports = seedBooks;