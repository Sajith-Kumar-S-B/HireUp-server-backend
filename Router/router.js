const express = require('express')
const userController = require('../Contoller/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const router = new express.Router()




//register API

router.post('/user/signup',userController.register)


// login API

router.post('/user/login',userController.login)



// recruit register API

router.post('/recruit/signup',userController.recruitRegister)


// login API

router.post('/recruit/login',userController.RecruitLogin)


// update user

router.put("/user/edit",jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)





module.exports = router