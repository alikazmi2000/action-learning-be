const moment = require('moment');
const zipcodes = require('zipcodes');
const utils = require('../middleware/utils');
const { Roles, ErrorCodes, Status } = require('../enums/index')
const { matchedData } = require('express-validator');
const auth = require('../middleware/auth');
const db = require('../middleware/db');
const usersService = require('../services/users');
const User = require('../models/user')
const Otp = require('../models/otp')

exports.signUp = async (req, res) => {
    try {
        let data = matchedData(req);
        // Check if email already exists
        if (typeof data.email !== 'undefined')
            await usersService.emailExists(data.email);
        let phoneObj;
        if (typeof data.phoneNumber !== 'undefined') {
            let phoneExist = await User.findOne({ phoneNumber: data.phoneNumber })
            console.log(phoneExist);
            if (phoneExist) {
                return utils.handleError(req, res, {}, 'USER.SIGNUP_PHONE_NUMBER_EXISTS');

            }
        }
        // Check if otp token is valid
        // await usersService.OTPTokenIsValid(data);

        // Creating a new User
        const userObj = await usersService.setSignUpRequest(data);
        const item = await db.createItem(userObj, User);
        console.log(item);
        // Getting User's data for the response
        // const user = await db.getItem(item._id, User);
        const info = await utils.setInfo(item, usersService.resUser);
        const token = await usersService.returnSignupToken(item, data.role);
        // if (typeof data.phoneNumber !== 'undefined') {
        //     // Removing Otp Token
        //     await db.deleteItemsByQuery(
        //         {
        //             ...phoneObj,
        //             token: data.otp_token
        //         },
        //         Otp
        //     );
        // }
        let successMsg = 'USER.SIGNUP_SUCCESS';
        utils.handleSuccess(res, successMsg, info, token);
    } catch (error) {
        console.log(error)
        utils.handleError(req, res, error, 'USER.SIGNUP_ERROR');
    }
};

/**
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
// eslint-disable-next-line complexity
exports.login = async (req, res) => {
    try {
        let data = matchedData(req);
        let user;
        if (typeof data.phoneNumber !== 'undefined') {
            const query = {
                phoneNumber: data.phoneNumber,
                role: data.role
            };
            user = await db.getItemByQuery(query, User, false);
        } else {
            const query = { email: data.email, role: data.role };
            user = await db.getItemByQuery(query, User, false);
        }
        await usersService.userIsExists(user);
        // await usersService.userIsBlocked(user, data.role);
        // await usersService.checkLoginAttemptsAndBlockExpires(user);
        const isPasswordMatch = await auth.checkPassword(data.password, user);
        if (!isPasswordMatch) {
            utils.handleError(req, res, await usersService.passwordsDoNotMatch(user));
        } else {
            // all ok, save access and return token
            user.loginAttempts = 0;
            await usersService.saveLoginAttemptsToDB(user);
            const userInfo = await usersService.saveUserAccessAndReturnToken(req, user, data.role);
            utils.handleSuccess(res, 'USER.LOGIN_SUCCESS', userInfo.user, userInfo.token);
        }
    } catch (error) {
        // Setting actual message for the api consumer
        if (error.message === 'USER.NOT_EXIST') {
            error.message = 'ERROR.INVALID_CREDENTIALS';
        }
        utils.handleError(req, res, error, 'USER.LOGIN_ERROR');
    }
};


exports.getUsers = async (req, res) => {
    try {
        const userList = await User.find().select('firstName lastName email phoneNumber profilePicture role status');
        return res.status(200).json({
            msg: "users fetched successfully",
            data: userList,
            status: 200


        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: error.msg,
            status: 500


        });

    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const type = req.query.type
        let query = {
            _id:id
        }
        if(type){
            query = {
                role:type,
                ...query
            }
        }
        const user = await User.findOne(query).select('firstName lastName email phoneNumber profilePicture role status');
        return res.status(200).json({
            msg: "users fetched successfully",
            data: user,
            status: 200


        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: error.msg,
            status: 500


        });

    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const user = await User.updateOne({ _id: id }, {
            $set: {
                ...data,
            }
        })
        return res.status(200).json({
            msg: "users updated successfully",
            data: user,
            status: 200


        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: error.msg,
            status: 500


        });

    }
}
