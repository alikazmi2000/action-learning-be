const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobs');
const jobsValidate = require('../validations/jobs.validate');
require('../../config/passport');
const passport = require('passport');
const { authorized } = require('../middleware/utils');
const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
        return await authorized(req, res, next, err, user);
    })(req, res, next);
};
const trimRequest = require('trim-request');

router.post('/create',
    requireAuth,
    trimRequest.all,
    jobsValidate.createJob,
    jobController.createJob);

router.get('/getAll',
    requireAuth,
    trimRequest.all
    , jobController.getAllJobs);

router.get('/getMyJobs',
    requireAuth,
    trimRequest.all
    , jobController.getMyJobs);

router.get('/getOne',
    requireAuth,
    trimRequest.all,
    jobsValidate.getJobById
    , jobController.getJobById);

router.post('/update',
    requireAuth,
    trimRequest.all,
    jobsValidate.updateJob,
    jobController.updateJob);

router.post('/startJob',
    requireAuth,
    trimRequest.all,
    jobsValidate.startJob,
    jobController.startJob);

router.post('/scheduleJob',
    requireAuth,
    trimRequest.all,
    jobsValidate.scheduleJob,
    jobController.scheduleJob);
router.post('/delete', requireAuth,
    trimRequest.all,
    jobsValidate.deleteJob,
    jobController.deleteJob);

module.exports = router;
