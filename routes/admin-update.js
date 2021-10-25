const express = require('express');
const router = express.Router();

const { Organisation } = require('../models');

const { checkIfSuperUser } = require('../middlewares');

router.get('/', checkIfSuperUser, async (req, res) => {
  let allOrgs = await Organisation.fetchAll();

  res.render('admin-update', {
    allOrgs: allOrgs.toJSON(),
  });
});

router.post('/', async (req, res) => {
  let i = 4;
  while (i < 8) {
    let serviceToUpdate = await Organisation.where({
      id: i,
    }).fetch({
      require: false,
    });

    let details = req.body[i];

    if (details) {
      serviceToUpdate.set('details', details);
      serviceToUpdate.set('last_updated', new Date());
      serviceToUpdate.save();
    }

    i++;
  }

  req.flash('success_messages', 'ICS details successfully updated!');
  res.redirect('/');
});

module.exports = router;
