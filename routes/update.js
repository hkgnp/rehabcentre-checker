const express = require('express');
const router = express.Router();

const { Organisation } = require('../models');

const { checkIfLoggedIn } = require('../middlewares');

router.get('/', checkIfLoggedIn, async (req, res) => {
  if (req.session) {
    const orgId = req.session.user.org_id;

    const org = await Organisation.where({
      id: orgId,
    }).fetch({
      require: false,
    });

    res.render('update', {
      orgName: org.toJSON(),
    });
  } else {
    req.flash(
      'error_messages',
      'Fatal error. Please contact the system administrator.'
    );
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  if (req.session) {
    const orgId = req.session.user.org_id;

    try {
      let serviceToUpdate = await Organisation.where({
        id: orgId,
      }).fetch({
        require: false,
      });

      let details = req.body.rehabCentreDetails;

      serviceToUpdate.set('details', details);
      serviceToUpdate.set('last_updated', new Date());
      serviceToUpdate.save();

      req.flash(
        'success_messages',
        'Rehab Centre details successfully updated!'
      );
      res.redirect('/');
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
