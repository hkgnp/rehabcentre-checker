const express = require('express');
const { Organisation } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let rehabCentreDetails = await Organisation.fetchAll();
rehabCentreDetails.sort();
  
  res.render('index', {
    rehabCentreDetails: rehabCentreDetails.toJSON(),
  });
});

module.exports = router;
