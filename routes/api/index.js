const express = require('express');
const { Organisation } = require('../../models');
const router = express.Router();

router.get('/', async (req, res) => {
  let icsDetails = await Organisation.fetchAll();

  res.send(icsDetails);
});

module.exports = router;
