const UserModel = require('../models/user');
const AdminModel = require('../models/admin');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');

const userActions = {
  register: asyncMiddleware(async (req, res) => {
    let user = await UserModel.findOne({ nameEmail: req.body.nameEmail });
    if (user) {
      res.status(status.success.accepted).json({
        message: 'Username or Email Already Exists',
        status: 'failure'
      });
    } else {

      // Save new user to db
      let hashedPassword = await passwordUtils.hashPassword(req.body.password);
      let newUser = new UserModel({
        nameEmail: req.body.nameEmail,
        password: hashedPassword,
        dob: req.body.dob,
        gender: req.body.gender,
        country: req.body.country
      });
      let savedUser = await newUser.save();

      // Remove Password From Object
      let addedUser = savedUser.toObject();
      delete addedUser.password;
      res.status(status.success.created).json({
        message: 'User Created Successfully',
        status: 'success',
        data: addedUser,
        token: 'Bearer ' + await jwt.signJwt({ id: savedUser.id })
      });
    }
  }),

  login: asyncMiddleware(async (req, res) => {
    let user = await UserModel.findOne({ nameEmail: req.body.nameEmail }).select('+password');
    if (user) {
      let verified = await passwordUtils.comparePassword(req.body.password, user.password);
      if (verified) {
        let loggedUser = user.toObject();
        delete loggedUser.password;
        res.status(status.success.accepted).json({
          message: 'Logged In Successfully',
          status: 'success',
          data: loggedUser,
          token: 'Bearer ' + await jwt.signJwt({ id: user.id })
        });
      } else {
        res.status(status.success.accepted).json({
          message: 'Wrong Password',
          status: 'failure'
        });
      }
    } else {
      res.status(status.success.accepted).json({
        message: 'User Not Found',
        status: 'failure'
      });
    }
  }),

  update: asyncMiddleware(async (req, res) => {
    console.log(req.body, req.decoded)
    let user = await UserModel.findByIdAndUpdate(req.decoded.id,
      { $push: { "tasks": req.body } },
      { new: true }
    )
    if (user) {
      res.status(status.success.accepted).json({
        message: 'Task Added',
        status: 'success',
        data: user
      });
    }
  }),

  // Admin
  adminLogin:asyncMiddleware(async (req, res) => {
    let user = await AdminModel.findOne({ userName: req.body.nameEmail }).select('+password');
    if (user) {
      let verified = await passwordUtils.comparePassword(req.body.password, user.password);
      if (verified) {
        let loggedUser = user.toObject();
        delete loggedUser.password;
        res.status(status.success.accepted).json({
          message: 'Logged In Successfully',
          status: 'success',
          token: 'Bearer ' + await jwt.signJwt({ id: user.id })
        });
      } else {
        res.status(status.success.accepted).json({
          message: 'Wrong Password',
          status: 'failure'
        });
      }
    } else {
      res.status(status.success.accepted).json({
        message: 'User Not Found',
        status: 'failure'
      });
    }
  })

};

module.exports = userActions;