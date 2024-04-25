const dotenv = require('dotenv');
dotenv.config();
const {where } = require('sequelize')
// importar modelos
const modeloUsuarios = require('../').Usuarios


const DietController = {
    
    async login(req, res){
         
        const mail = req.user.email
        mail === process.env.PROJECT_ID ?  res.redirect('/dashboard') : res.redirect('/user')

        // CRUD TABLA USUARIOS
   
        
        
        

    },


}

module.exports = DietController;

