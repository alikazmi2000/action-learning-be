const { check } = require('express-validator');

exports.user = [
  check('firstName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('lastName')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('email')
    .optional()
];

exports.otpFields = [
  check('otp_token')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('phoneNumber')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
];

exports.address = [
  check('street')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('city')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('state')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('country')
    .optional()
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('zip_code')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
  // TODO: Add Validation for the location (latitude, longitude)
];
