exports.sendtoken = (user, status, res) => {
    const token = user.generatetoken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.Cookie_Expire * 24 * 60 * 60 * 1000),
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production' // true only in production for HTTPS
    };

    res.status(status).cookie('token', token, options).json({
        success: true,
        user: user
    });
};
