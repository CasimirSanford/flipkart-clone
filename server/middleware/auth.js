const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorhandler');
const aysnchandler = require('./aysnchandler');
const UserModel = require('../models/usermodel');

exports.isAuthenticatedUser = aysnchandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Please login first before moving further', 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = await UserModel.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler('User not found from token', 404));
        }

        next();
    } catch (err) {
        return next(new ErrorHandler('Invalid or expired token', 401));
    }
});

exports.authorizerole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('You are not allowed to access this route', 403));
        }
        next();
    };
};
