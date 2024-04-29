const express = require('express')
const router = express.Router();
const DietController = require('../controllers/dietController.js')
const decodeToken = require('../middlewares/authMiddleware.js')


router.get('/') 
//router.post('/login',  decodeToken, DietController.login)
router.get('/user', decodeToken, DietController.getUserByMail)  //home del user
router.get('/user/:id/alldietary', decodeToken, DietController.alldietary) // saca todos los dietarios
router.get('/user/:id/alldietary/:id_plan', decodeToken, DietController.getDietary) //dietario concreto con todas las recetas e ingredientes y demas
//router.get('/user/recipe/:id') //para sacar la receta y su preparación
//router.get('/user/dietary/:id') //saca un dietario por id
router.get('/user/:id/mytracking', decodeToken, DietController.getMyTracking) //seguimientos del usuario
router.get('/user/:id/myagenda') //las citas

router.get('/dashboard') //home del admin
router.get('/dashboard/users', decodeToken, DietController.getAllUsers) //salen todos los pacientes del dietista
router.get('/dashboard/users/:id', decodeToken, DietController.getUserTracking) //seguimiento del paciente ID
router.post('/dashboard/users/newuser', decodeToken, DietController.createNewUser)
router.get('/dashboard/recipes', decodeToken, DietController.getRecipes)

module.exports = router;