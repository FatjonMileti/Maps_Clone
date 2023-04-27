const express = require('express');
const { Location } = require('../models/location')

const mapController = {
  async search(req, res, next) {
    const query = req.query.q;
    const location = await Location.findOne({
      name: { $regex: query, $options: "i" },
    });
    res.json(location);
  },
};


module.exports = mapController;