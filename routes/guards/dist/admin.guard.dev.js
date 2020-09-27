"use strict";

module.exports = function (req, res, next) {
  if (req.session.isAdmin) next();else console.log('not admin');
};