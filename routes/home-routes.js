const router = require('express').Router();
const withAuth = require('../utils/auth');
const { content, user } = require('../models');
var editID = '';
//need to update
router.get('/', async (req, res) => {

  const contentDataRaw = await content.findAll({
    include: [{ model: user }]
  }).catch((err) => {
    res.json(err);
  });
  const contentData = contentDataRaw.map((data) => ({ id: data.id, title: data.title, content: data.content, date_created: data.date_created.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' }), email: data.user.email, name: data.user.email.substring(0, data.user.email.indexOf('@')) }));
  res.render('homepage', { logged_in: req.session.logged_in, contentData });
});

router.get('/login', (req, res) => {
  res.render('login', { logged_in: req.session.logged_in });
});
router.get('/logout', (req, res) => {
  res.render('homepage', { logged_in: req.session.logged_in });
});
router.get('/signup', (req, res) => {
  res.render('signup', { logged_in: req.session.logged_in });
});
router.get('/add', withAuth, async (req, res) => {
  res.render('add', { logged_in: req.session.logged_in });
});
router.post('/create', withAuth, async (req, res) => {
    try {
      const userData = await content.create(
        {
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id,
        }
      );
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }

});
router.get('/dashboard', withAuth, async (req, res) => {

  const contentDataRaw = await content.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [{ model: user }]
  }).catch((err) => {
    res.json(err);
  });
  const contentData = contentDataRaw.map((data) => ({ id: data.id, title: data.title, content: data.content, date_created: data.date_created.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' }), email: data.user.email, name: data.user.email.substring(0, data.user.email.indexOf('@')) }));
  res.render('dashboard', { logged_in: req.session.logged_in, contentData });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  const id = req.params.id.toLowerCase();
  editID = id;
  const contentDataRaw = await content.findAll({
    where: {
      id: id,
      user_id: req.session.user_id,
    },
    include: [{ model: user }]
  }).catch((err) => {
    res.json(err);
  });
  const contentData = contentDataRaw.map((data) => (
    {
      id: data.id,
      title: data.title,
      content: data.content,
      date_created: data.date_created.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' }), email: data.user.email, name: data.user.email.substring(0, data.user.email.indexOf('@'))
    }));
  res.render('edit', { logged_in: req.session.logged_in, contentData });
});
router.put('/update', async (req, res) => {
  const data = await content.update(
    {
      id: editID,
      title: req.body.title,
      content: req.body.content,
      date_created: new Date(),
    },
    {
      where: {
        id: editID,
        user_id: req.session.user_id,
      },
    });
  return res.json(data);
});
router.delete('/edit/id', async (req, res) => {
  //const id = req.params.id.toLowerCase();
  console.log(editID);

  //delete one content by its `id` value
  let data = await content.destroy({
    where: {
      id: editID,
      user_id: req.session.user_id,
    },
  }).catch((err) => {
    res.status(400).json(err);
  });

  return res.json(data);
});

module.exports = router;