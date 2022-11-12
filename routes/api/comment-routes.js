const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { content, user, comment } = require('../../models');

router.get('/:id', withAuth, async (req, res) => {
    const id = req.params.id.toLowerCase();
    editID = req.params.id.toLowerCase();
    let contentDataRaw = await content.findAll({
      where: {
        id: id,
      },
      include: [{ model: user}]
    });
  
    const contentData = contentDataRaw.map((data) => ({ id: data.id, title: data.title, content: data.content, date_created: data.date_created.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' }), email: data.user.email, name: data.user.email.substring(0, data.user.email.indexOf('@')) }));
  
    let commentDataRaw = await comment.findAll({
      where: {
        content_id: id,
      },
      include: [{ model: user}]
    })
    const commentData = commentDataRaw.map((data) => ({ id: data.user.id, comment: data.comment, date_created: data.date_created.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', weekday: "long", hour: '2-digit', hour12: true, minute: '2-digit', second: '2-digit' }), email: data.user.email, name: data.user.email.substring(0, data.user.email.indexOf('@')) }));
  
    res.render('comment', { logged_in: req.session.logged_in, contentData, commentData});
  });

module.exports = router;