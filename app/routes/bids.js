const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bids');
const bidValidate = require('../validations/bid.validate');
require('../../config/passport');
const passport = require('passport');
const { authorized } = require('../middleware/utils');
const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user) => {
        return await authorized(req, res, next, err, user);
    })(req, res, next);
};
const trimRequest = require('trim-request');

router.post(
    '/create',
    requireAuth,
    trimRequest.all,
    bidValidate.createBid,
    bidController.createBid
);

router.get('/getAll', requireAuth, trimRequest.all, bidController.getAllBids);

// router.get('/getMyBids', requireAuth, trimRequest.all, bidController.getMyBids);

router.get(
    '/getOne',
    requireAuth,
    trimRequest.all,
    //   bidValidate.validateGetBidById,
    bidController.getBidById
);

router.post(
    '/update',
    requireAuth,
    trimRequest.all,
    //   bidValidate.validateUpdateBid,
    bidController.updateBidById
);

// router.post(
//   '/acceptBid',
//   requireAuth,
//   trimRequest.all,
// //   bidValidate.validateAcceptBid,
//   bidController.acceptBid
// );

// router.post(
//   '/rejectBid',
//   requireAuth,
//   trimRequest.all,
//   bidValidate.validateRejectBid,
//   bidController.rejectBid
// );

router.post(
    '/delete',
    requireAuth,
    trimRequest.all,
    //   bidValidate.validateDeleteBid,
    bidController.deleteBidById
);

module.exports = router;
