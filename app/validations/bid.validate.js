
const { validationResult } = require('../middleware/utils');
const { check } = require('express-validator');
const { Bids, Status } = require('../enums');

exports.createBid = [
  check('bidType').notEmpty().withMessage('MISSING').isIn(['worker_bid', 'vendor_bid']).withMessage('INVALID_BID_TYPE'),
  check('jobId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_JOB_ID'),
  check('bidPrice').notEmpty().withMessage('MISSING').isNumeric().withMessage('INVALID_BID_PRICE'),
  check('workingHours').optional().isNumeric().withMessage('INVALID_WORKING_HOURS'),
  check('descriptionOfDelivery').optional().isString().withMessage('INVALID_DescriptionOfEquipment'),
  check('appointmentDate').optional().isString().withMessage('INVALID_SCHEDULE_TIME'),
  check('milestones').optional().isArray().withMessage('MILESTONES_NOT_ARRAY'),
  check('equipments').optional().isArray().withMessage('MILESTONES_NOT_ARRAY'),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];


exports.getUserBidById = [
  check('jobId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_JOB_ID'),
  (req, res, next) => {
    validationResult(req, res, next);
  },
];


exports.assignWorkerBid = [
  check('jobId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_JOB_ID'),
  check('workerId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_WORKER_ID'),
  check('bidId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_BID_ID'),

  (req, res, next) => {
    validationResult(req, res, next);
  },
];
exports.assignVendorBid = [
  check('jobId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_JOB_ID'),
  check('vendorId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_VENDOR_ID'),
  check('bidId').notEmpty().withMessage('MISSING').isMongoId().withMessage('INVALID_BID_ID'),

  (req, res, next) => {
    validationResult(req, res, next);
  },
];