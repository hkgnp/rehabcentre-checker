const express = require('express');
const { Organisation } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let icsDetails = await Organisation.fetchAll();
  console.log(icsDetails.toJSON());
  res.render('index', {
    icsDetails: icsDetails.toJSON(),
  });
});

module.exports = router;
