
const { validationResult } = require('../middleware/utils');
const { check } = require('express-validator');
const { Bids, Status } = require('../enums');

exports.createBid = [
  check('bidType').notEmpty().withMessage('MISSING').isIn(['worker_bid', 'vendor_bid']).withMessage('INVALID_BID_TYPE'),
  check('jobId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_JOB_ID'),
  check('bidPrice').optional().isNumeric().withMessage('INVALID_BID_PRICE'),
  check('workingHours').optional().isNumeric().withMessage('INVALID_WORKING_HOURS'),
  check('milestones').optional().isArray().withMessage('MILESTONES_NOT_ARRAY'),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];