const express = require('express')
const router = express.Router();
const DietController = require('../controllers/dietController.js')
const decodeToken = require('../middlewares/authMiddleware.js')




router.get('/',DietController.getUsuarioByCorreo) 
router.post('/login',  decodeToken, DietController.login)
router.get('/user')  //home del user
router.get('/user/:id/dietary') //dietario actual
router.get('/user/alldietary') // saca todos los dietarios
router.get('/user/recipe/:id') //para sacar la receta y su preparación
router.get('/user/dietary/:id') //saca un dietario por id
router.get('/user/mytracking') //seguimientos
router.get('/user/myagenda') //las citas

router.get('/dashboard') //home del admin
router.get('/dashboard/users') //salen todos los pacientes del dietista
router.get('/dashboard/:id/tracking')

module.exports = router;