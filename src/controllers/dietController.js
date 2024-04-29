const dotenv = require('dotenv');
dotenv.config();
const {where } = require('sequelize')


// importar modelos
const modeloUsuarios = require('../../models').Usuarios
const modeloComida = require('../../models').Comidas


const DietController = {

    //CRUD TABLA USUARIOS
    async getUserByMail(req , res){
        const mail = req.user.email
        console.log(mail)
        try {           
            const user = await modeloUsuarios.findOne({
                where: {
                    Correo: mail
                }
            });
                        
            res.json(JSON.stringify(user))

        } catch (error) {
            console.error(error)
        }
    },
    async createNewUser(req, res) {
        try {
            console.log('req.body', req.body)
            const newUser = await modeloUsuarios.create(req.body);
            res.status(201).send(newUser);
            // res.json(newUser)

        } catch(error){
            console.error(error)
        }
    },
    async alldietary(req, res){
        // llamada a la DB para todos los planes
        console.log(req.params.id)
        const planes =[
            {
                idPlan:1,
                nombre: 'Plan dietético 1'
            },
            {
                idPlan:2,
                nombre: 'Plan dietético 2'
            },
            {
                idPlan:3,
                nombre: 'Plan dietético 3'
            },
            {
                idPlan:4,
                nombre: 'Plan dietético 4'
            },
        ]
        res.json(JSON.stringify(planes))
    },

    async getDietary (req, res){
        console.log(req.params)
        //con el idPlan sacamos los datos de todas las recetas de los 7 dias

        const dietary ={
            id:1,
            nombre: 'Plan dietético 1',
            dias1:[
                {
                 titulo: 'Cafe con leche',
                 ingredientes: 'cafe: 50g - leche desnatada: 150g',
                 preparacion: '-'
                },
                {
                    titulo: 'Pure de verduras',
                    ingredientes: 'Aceite: 5g - Espinaca: 75g - Patata: 75g',
                    preparacion: '1. Pelar y trocear la patata y la zanahoria. Lavar y picar finamente las espinacas. Limpiar las judías verdes, eliminando los extremos y trocear'
                },
                {
                    titulo: 'Tortilla de claras con pimiento y cebolla',
                    ingredientes: ' Clara de huevo pasteurizada : 140 g (4 unidades) , Huevo de gallina : 60 g (1 unidad talla M) , Cebolla blanca : 90 g (1 unidad pequeña) , Pimiento rojo : 100 g (1/2 unidad mediana) , Aceite de oliva : 5 g (1 cucharada de postre) ,Sal común : 0.5 g',
                    preparacion: '1. Cortar el pimiento y la cebolla en dados de similar tamaño. Saltear en una sartén con la cantidad indicada de aceite. 2 Batir el huevo con las claras y la sal. Agregar el salteado de hortalizas. 3. Volcar la mezcla en un recipiente adecuado para microondas. 4. Cuajar la tortilla en el microondas durante 6-7 minutos a máxima potencia. Nota: Las claras (ovoproducto pasteurizado) pueden comprarse en envases de 300 ml (10 claras aproximadamente)'
                }
            ],
            dias2:[
                {
                 titulo: 'Cafe con leche',
                 ingredientes: 'cafe: 50g - leche desnatada: 150g',
                 preparacion: '-'
                },
                {
                    titulo: 'Quinoa con langostinos',
                    ingredientes: 'cantidades 1 persona: Quinoa : 60 g , Langostino : 50 g , Pimiento rojo : 30 g (2 rodaja) , Pimiento verde : 30 g (2rodajas) , Cebolla o cebolleta : 50 g (1/3 de cebolleta) , Caldo de pescado : 150 g , Aceite de oliva : 5 g (1 cucharada',
                    preparacion: '1. Colocar la quinoa en un colador y lavar bajo el chorro de agua fría durante medio minuto. Cocer durante 15 minutos con el doble de caldo de pescado que de quinoa. Apagar el fuego y dejar reposar. 2. Pochar la cebolla y e',
                },
                {
                    titulo: 'Pescadilla a la plancha con canonigos y zanahoria',
                    ingredientes: ' Pescadilla : 200 g (2 unidades) , Canónigos : 40 g (1 plato pequeño) , Zanahoria : 80 g (1 unidad mediana (80g)) , Aceite de oliva : 8 g (1 cucharada de postre)',
                    preparacion: '1. Cortar y desechar la cabeza y la cola de la pescadilla, abrir por la mitad y retirar la espina central y laterales. Untar la plancha con unas gotas de aceite y asar la pescadilla. 2. Mezclar los canónigos con la zanahoria cortada en rodajas finas y aliñar con aceite de oliva. 3. Emplatar la pescadilla asada con la ensalada de guarnición.'
                }
            ]
            
        }
        
        res.json(JSON.stringify(dietary))

    },

    async getMyTracking (req, res){
        console.log(req.params.id)

        const tracking = {
            weight: [73.7, 75.2, 73.7, 72.3, 71.4, 70.3, 69.9, 69.6, 65.8, 66.4, 63.7, 63.9, 62.7, 62.4, 61.5],
            dates: ['12/05/2023', '23/05/2023', '30/05/2023', '20/06/2023', '27/06/2023', '04/07/2023', '18/07/2023', '08/09/2023', '19/10/2023', '16/11/2023', '14/12/2023', '17/01/2024', '14/02/2024', '13/03/2024', '10/04/2024']
        }
        res.json(JSON.stringify(tracking))
    },

    async getAllUsers (req, res){
        try {           
            const users = await modeloUsuarios.findAll();
                console.log(users)
            res.json(JSON.stringify(users))

        } catch (error) {
            console.error(error)
        }


    },

    async getUserTracking (req, res){
    },

    async getRecipes (req, res){
       try {
            console.log('getRecipes')
            const comida = await modeloComida.findAll();
            console.log(comida);
            res.json(JSON.stringify(comida))
        
       } catch (error) {
        console.error(error)
       }
    }



}




module.exports = DietController;

