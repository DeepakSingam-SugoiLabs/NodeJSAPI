const express = require('express');
const employeeController = require('../controllers/employee');
const userController = require('../controllers/users');

const router = express.Router()
const validator = require('../validators')
//API for create Employee
router.post('/createEmployee',userController.requireSignin,validator.createEmployeeValidator,employeeController.createEmployee)
//API for viewing all Employees
router.get("/allEmployees",userController.requireSignin,employeeController.allEmployees);
//API for Find Employee by name
router.get("/allEmployee",userController.requireSignin,employeeController.allEmployee);


router.get("/getEmployeebyName/:userId",userController.requireSignin,employeeController.getSingleEmployee);
router.param("userId",employeeController.userById);
//API for Delete employee by ID
router.delete("/delete_employee/:userId",userController.requireSignin,employeeController.deleteUser)
//API for sorting Employees by age
router.get("/sortby",userController.requireSignin,employeeController.sortbyValue)
//API for sorting Employees by age salary




router.get("/sort_salary",userController.requireSignin,employeeController.sortbySalary)
// //API for sorting Employees by age name
// router.get("/sort_name",userController.requireSignin,employeeController.sortbyName)


module.exports = router;