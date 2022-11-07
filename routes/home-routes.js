const router = require('express').Router();
const withAuth = require('../utils/auth');

//need to update
router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/testpage.html'));
    res.render('homepage', {logged_in: req.session.logged_in}); //, {logged_in: req.session.logged_in}
});

router.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/testpage.html'));
    res.render('login', {logged_in: req.session.logged_in}); //
});
router.get('/profile', withAuth, (req,res) => {
    res.render('profile', {logged_in: req.session.logged_in}); 
});

module.exports = router;