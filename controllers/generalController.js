const UserModel = require('../models/user');
const LinkModel = require('../models/links');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const nodemailer = require("nodemailer");

const generalActions = {
  // Admin

  dashboard: asyncMiddleware(async (req, res) => {
    let users = await UserModel.find();
    if (users) {
      res.status(status.success.accepted).json({
        message: 'User Records',
        status: 'success',
        data: users
      });
    } else {
      res.status(status.success.accepted).json({
        message: 'Users Not Found',
        status: 'failure'
      });
    }
  }),

  // Links Site

  getLinks: asyncMiddleware(async (req, res) => {
    let links = await LinkModel.find();
    if (links) {
      res.status(status.success.accepted).json({
        message: 'Link Data',
        status: 'success',
        data: links[0]
      });
    }
  }),

  updateLinks: asyncMiddleware(async (req, res) => {
    let links = await LinkModel.findOneAndUpdate(req.body.id, { links: req.body.links });
    if (links) {
      res.status(status.success.accepted).json({
        message: 'Link Data',
        status: 'success',
        data: links
      });
    }
  })
};

module.exports = generalActions;