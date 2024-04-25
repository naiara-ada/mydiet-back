const dotenv = require('dotenv');
dotenv.config();
const {where } = require('sequelize')


// importar modelos
const modeloUsuarios = require('../../models').Usuarios


const DietController = {

    async getUsers(req, res){
         
        const mail = req.user.email
        mail === process.env.PROJECT_ID ?  res.redirect('/dashboard') : res.redirect('/user')
    },
    // CRUD TABLA USUARIOS
    async getUsuarioByCorreo(req , res){
        const mail = req.user.email
        console.log(mail)
        try {
            const user = await modeloUsuarios.findOne({
                where: {
                    Correo: `${req.params.Correo='marialopezmix@gmail.com'}`
                }
            });
// forma de mostrar el resultado:            
//          res.json(JSON.stringify(user))
/*
            res.json({
                data:{Usuario: user}
            })
*/
            res.json(user)
        } catch (error) {
            res.status(500).send({message: 'Error finding E-Mail', error});
        }
    },
    async createNewUser(req, res) {
        try {
            const newUser = await modeloUsuarios.create(req.body);
            res.status(201).send(newUser);
            // res.json(newUser)

        } catch(error){

        }
    }
}




module.exports = DietController;

