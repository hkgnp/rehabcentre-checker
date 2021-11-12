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
  const numberOfServices = process.env.NO_OF_SERVICES;

  let i = 1;
  while (i <= numberOfServices) {
    let serviceToUpdate = await Organisation.where({
      id: i,
    }).fetch({
      require: false,
    });

    let rehabCentreData = {
      female_capacity: req.body['female_capacity' + i.toString()],
      female_pending: req.body['female_pending' + i.toString()],
      female_available: req.body['female_available' + i.toString()],
      male_capacity: req.body['male_capacity' + i.toString()],
      male_pending: req.body['male_pending' + i.toString()],
      male_available: req.body['male_available' + i.toString()],
      special_prog_female_capacity:
        req.body['special_prog_female_capacity' + i.toString()],
      special_prog_female_pending:
        req.body['special_prog_female_pending' + i.toString()],
      special_prog_female_available:
        req.body['special_prog_female_available' + i.toString()],
      special_prog_male_capacity:
        req.body['special_prog_male_capacity' + i.toString()],
      special_prog_male_pending:
        req.body['special_prog_male_pending' + i.toString()],
      special_prog_male_available:
        req.body['special_prog_male_available' + i.toString()],
      special_remarks: req.body['special_remarks' + i.toString()],
    };

    serviceToUpdate.set(rehabCentreData);
    serviceToUpdate.set('last_updated', new Date());
    serviceToUpdate.save();

    i++;
  }

  req.flash('success_messages', 'Rehab Centre details successfully updated!');
  res.redirect('/');
});

module.exports = router;
