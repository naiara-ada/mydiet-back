const express = require('express')
const router = express.Router();
const DietController = require('../controllers/dietController.js')
const decodeToken = require('../middlewares/authMiddleware.js')


router.get('/', DietController.getUsers,DietController.getUsuarioByCorreo) 
//router.post('/login',  decodeToken, DietController.login)
router.get('/user', decodeToken, DietController.user)  //home del user
router.get('/user/:id/alldietary', decodeToken, DietController.alldietary) // saca todos los dietarios
router.get('/user/:id/alldietary/:id_plan') //dietario concreto
router.get('/user/recipe/:id') //para sacar la receta y su preparación
router.get('/user/dietary/:id') //saca un dietario por id
router.get('/user/:id/mytracking') //seguimientos
router.get('/user/:id/myagenda') //las citas

router.get('/dashboard') //home del admin
router.get('/dashboard/users') //salen todos los pacientes del dietista
router.get('/dashboard/:id/tracking')

module.exports = router;