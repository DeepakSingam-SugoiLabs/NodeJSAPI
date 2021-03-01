const express = require('express');
const employeeController = require('../controllers/employee');
const userController = require('../controllers/users');

const router = express.Router()
const validator = require('../validators')

router.post('/createEmployee',userController.requireSignin,validator.createEmployeeValidator,employeeController.createEmployee)
// router.post('/signin',validator.verifyEmployeeValidator,employeeController.verifyPost)
router.get("/allEmployees",userController.requireSignin,employeeController.allEmployees);
router.get("/getEmployeebyName/:userId",userController.requireSignin,employeeController.getSingleEmployee);
router.param("userId",employeeController.userById);
router.delete("/delete_employee/:userId",userController.requireSignin,employeeController.deleteUser)
router.get("/sort_age/:age",userController.requireSignin,employeeController.sortbyAge)


module.exports = router;