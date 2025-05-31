const express = require('express');
const { 
  createuser, loginuser, updateuser, logoutuser, 
  adminupdateuser, deleteuser, getalluser, getuser, admingetuser 
} = require('../controllers/usercontroller');

const { isAuthenticatedUser, authorizerole } = require('../middleware/auth');
const app = express.Router();

exports.CreateUser = app.post('/create/user', createuser);
exports.LoginUser = app.post('/login/user', loginuser);
exports.UpdateUser = app.put('/update/user', isAuthenticatedUser, updateuser);
exports.LogoutUser = app.get('/logout/user', isAuthenticatedUser, logoutuser);
exports.GetUser = app.get('/me/user', isAuthenticatedUser, getuser);

// admin routes
exports.AdminUpdateuser = app.put('/admin/update/user/:id', isAuthenticatedUser, authorizerole('admin'), adminupdateuser);
exports.AdminRemoveUser = app.delete('/admin/delete/user/:id', isAuthenticatedUser, authorizerole('admin'), deleteuser);
exports.GetAllUSer = app.get('/getall/user', isAuthenticatedUser, authorizerole('admin'), getalluser);
exports.AdminGetUser = app.get('/admin/getuser/:id', isAuthenticatedUser, authorizerole('admin'), admingetuser);
