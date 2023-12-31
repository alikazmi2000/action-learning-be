const userCtrl = require('../controllers/users');
const userValidate = require('../validations/users.validate');

const { Roles } = require('../enums');
const express = require('express');
const router = express.Router();
require('../../config/passport');
const passport = require('passport');
const { authorized } = require('../middleware/utils');
const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    return await authorized(req, res, next, err, user);
  })(req, res, next);
};
const trimRequest = require('trim-request');


/*
 ******************
 * User Auth routes
 ******************
 */

/*
 * SignUp route
 */
router.post(
  '/signup',
  trimRequest.all,
  userValidate.signup,
  userCtrl.signUp
);
router.post(
  '/addUser',
  trimRequest.all,
  userValidate.signup,
  userCtrl.signUp
);
/*
 * SignUp route
 */
router.post(
  '/login',
  trimRequest.all,
  userValidate.login,
  userCtrl.login
);
/*
 * updateUser route
 */
router.post(
  '/update',
  requireAuth,
  trimRequest.all,
  userValidate.update,
  userCtrl.updateUser
);
router.get("/getAll/:type",
  requireAuth,
  userCtrl.getUsers
);
router.get("/getOne/:id",
  requireAuth,
  userCtrl.getUser
)

// router.put("/:id")
module.exports = router;
