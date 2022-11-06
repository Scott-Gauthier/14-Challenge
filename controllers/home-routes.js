const router = require('express').Router();
const path = require('path');

//need to update
router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/testpage.html'));
    res.render('homepage'); //, {logged_in: req.session.logged_in, asdf: reg}
});

router.get('/login', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public/testpage.html'));
    res.render('login'); //, {logged_in: req.session.logged_in, asdf: reg}
});


module.exports = router;