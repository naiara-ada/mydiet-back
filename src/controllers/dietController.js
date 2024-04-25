const dotenv = require('dotenv');
dotenv.config();

const DietController = {
    
    async getUsers(req, res){
         
        const idUser = [1,2,3,4,5]
        
        
        res.json(JSON.stringify(idUser))
        // mirar con la base de datos cual es el id de usuario    

    },
    async user(req, res){
        //devolver de la base de datos la tabla usuario 
        //res.json(req.userID)
        console.log('req.user', req.user.email)
        const usuario ={
            id: 1,
            nombre: 'Maria',
            email: 'marialopezmix@gmail.com',
            rol: 'usuario'
        }
        res.json(JSON.stringify(usuario))
    },
    async alldietary(req, res){
        //devolver de la base de datos todos los planes del usuario
        console.log('req.params alldietary', req.params)
            const planes=[{
                idPlan:1,
                nombre:'Plan semana 1'
            },
            {
                idPlan:2,
                nombre:'Plan semana 2'
            },
            {
                idPlan:3,
                nombre:'Plan semana 3'
            },
            {
                idPlan:4,
                nombre:'Plan semana 4'
            },
        ]
    res.json(JSON.stringify(planes))
    }
    

}

module.exports = DietController;

