const { validationResult } = require('../middleware/utils');
const { check } = require('express-validator');
const { Category, JobTypes, Status } = require('../enums');

exports.createJob = [
    check('name')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('description')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('category')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isIn(Object.values(Category))
        .withMessage('INVALID_CATEGORY'),
    check('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('INVALID_ASSIGNED_TO_ID'),
    // check('jobRequester')
    //     .exists()
    //     .withMessage('MISSING')
    //     .not()
    //     .isEmpty()
    //     .withMessage('IS_EMPTY')
    //     .isMongoId()
    //     .withMessage('INVALID_JOB_REQUESTER_ID'),
    check('jobManager')
        .optional()
        .isMongoId()
        .withMessage('INVALID_JOB_MANAGER_ID'),
    check('jobVendor')
        .optional()
        .isMongoId()
        .withMessage('INVALID_JOB_VENDOR_ID'),
    check('type')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isIn(Object.values(JobTypes))
        .withMessage('INVALID_JOB_TYPE'),
    check('status')
        .optional()
        .isIn(Object.values(Status))
        .withMessage('INVALID_JOB_STATUS'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

exports.updateJob = [
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID'),
    check('name')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('description')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('category')
        .optional()
        .isIn(Object.values(Category))
        .withMessage('INVALID_CATEGORY'),
    // check('assignedTo')
    //     .optional()
    //     .isMongoId()
    //     .withMessage('INVALID_ASSIGNED_TO_ID'),
    // check('jobRequester')
    //     .optional()
    //     .isMongoId()
    //     .withMessage('INVALID_JOB_REQUESTER_ID'),
    // check('jobManager')
    //     .optional()
    //     .isMongoId()
    //     .withMessage('INVALID_JOB_MANAGER_ID'),
    // check('jobVendor')
    //     .optional()
    //     .isMongoId()
    //     .withMessage('INVALID_JOB_VENDOR_ID'),
    // check('type')
    //     .optional()
    //     .isIn(Object.values(JobTypes))
    //     .withMessage('INVALID_JOB_TYPE'),
    check('status')
        .optional()
        .isIn(Object.values(Status))
        .withMessage('INVALID_JOB_STATUS'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];
exports.startJob = [
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];
exports.scheduleJob = [
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID'),
    check('scheduleTime')
        .exists()
        .withMessage('MISSING_SCHEDULE_TIME')
        .isISO8601()
        .withMessage('INVALID_SCHEDULE_TIME_FORMAT'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];
exports.submitSurvey = [
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID'),
    check('surveyForm')
        .exists()
        .withMessage('MISSING_SURVEY_FORM'),
    check('publishToVendors')
        .exists()
        .withMessage('MISSING_PUBLISH_TO_VENDORS'),
    check('publishToWorkers')
        .exists()
        .withMessage('MISSING_PUBLISH_TO_WORKERS'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

exports.cancelJob = [
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID'),
    check('cancelReason') 
    .exists()
    .withMessage('MISSING_REASON'),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];
exports.deleteJob = (req, res, next) => {
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID')(req, res, next);
};

exports.getJobById = (req, res, next) => {
    check('_id')
        .isMongoId()
        .withMessage('INVALID_JOB_ID')(req, res, next);
};