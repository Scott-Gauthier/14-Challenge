const router = require('express').Router();
const { user } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await user.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {

    const userData = await user.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email !!!! or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/new', async (req, res) => {
  const userDataCheck = await user.findOne({ where: { email: req.body.email } });
  if (userDataCheck) {
    res
      .status(400)
      .json({ message: 'Account already exists. Please create a new account.'});
    return;
  } else {

  const { name: name, email, password } = req.body;
  // If all the required properties are present
  if (name && email && password) {
    // Variable for the object we will save
    const newUser = {
      name,
      email,
      password,
      //user_id: 1, //need to get from SQL database
    };
  
    user.create(newUser)
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      res.json(err);
    })
    ;
    const response = {
      status: 'success',
      body: newUser,
    };

    //res.status(201).json(response);
  } else {
    //res.status(500).json('Error in posting review');
  }
}
});

module.exports = router;

