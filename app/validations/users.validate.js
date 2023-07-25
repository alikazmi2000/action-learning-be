const {
  validationResult,
  isValidDateAndTime
} = require('../middleware/utils');
const commonValidation = require('./common.validate');
const { check, oneOf } = require('express-validator');
const { Roles, Status } = require('../enums');
const PASSWORD_MIN_LENGTH = process.env.PASSWORD_MIN_LENGTH;

exports.signup = [
  ...commonValidation.user,
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: PASSWORD_MIN_LENGTH
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn([Roles.Customer, Roles.Manager,Roles.Vendor,Roles.Worker])
    .withMessage('ERROR.INCORRECT_ROLE'),
  check('profile_picture')
    .optional()
    .custom(async value => {
      return await isFileExistsOnAWSValidator(value);
    }),
  // check('otp_token')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  check('phoneNumber')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];
exports.login = [
  check('email')
  .exists()
  .withMessage('MISSING')
  .not()
  .isEmpty()
  .withMessage('IS_EMPTY'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: PASSWORD_MIN_LENGTH
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn([Roles.Customer, Roles.Manager,Roles.Vendor,Roles.Worker])
    .withMessage('ERROR.INCORRECT_ROLE'),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates verify Phone request
 */


