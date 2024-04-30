const dotenv = require('dotenv');
const client = require('../../config/config'); // Importar la instacncia del cliente de la base de datos
//const { json } = require('sequelize');
dotenv.config();


// importar modelos
/*
const modeloUsuarios = require('../../models').Usuarios
const modeloComida = require('../../models').Comidas
const modeloDesayuno = require('../../models').Desayunos
const modeloCena = require('../../models').Cenas
const modeloSeguimiento = require('../../models').SeguimientoCita
const modeloDias = require('../../models').Dias
*/

const DietController = {

    //CRUD TABLA USUARIOS
    async getUserByMail(req , res){
        const mail = req.user.email;
        //const mail ='marialopezmix@gmail.com'
        console.log('****MAIL***',mail);
        try {
            const queryMail =`SELECT * FROM usuarios WHERE Correo = '${mail}'`;
            const result = await client.execute(queryMail);
            // Así se accede a los datos que trae:
            console.log(result.rows[0].id);
            
            const resultado = result.rows[0];
            res.json(JSON.stringify(resultado));


        } catch (err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

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
        console.log('*****ID=*****',req.params.id)
        const id = req.params.id;
        const planNombre=[];
        const planId =[];
        try {
            const queryPlan =`SELECT Nombre, Plan_id FROM plans WHERE User_id= '${id}'`;
            const result = await client.execute(queryPlan);
            res.json(result);
            console.log ('****REsult AllDietary*****', result)
            // guardamos los planes se la base de datos asociada al id en la variable planes
            const planes = result.rows.map((row)=>{
                planNombre.push(row.Nombre);
                planId.push(row.Plan_id)
        });
            
            
            console.log('***Planes***', planNombre);
            console.log('****Plan_id****', planId)

        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },

    async getDietary (req, res){
        console.log(req.params.Plan_id)
        const plan_id= 1
        const arrDiasRecetas =[];
        
        try {
            const queryDiasRecetas = `SELECT id, Titulo, Ingredientes, Preparacion FROM desayunos WHERE Dias_id='${plan_id}' UNION ALL 
                SELECT id, Titulo, Ingredientes, Preparacion FROM comidas WHERE Dias_id='${plan_id}' UNION ALL
                SELECT id, Titulo, Ingredientes, Preparacion FROM cenas WHERE Dias_id='${plan_id}'`;
            const result = await client.execute(queryDiasRecetas);
            res.json(result);
            console.log('*****RESULT de getDietary******',result);
            const diasRecetas = result.rows.map((row)=>{
                arrDiasRecetas.push(row.id, row.Titulo, row.Ingredientes, row.Preparacion);
                
            });
            console.log('******ArrDiasRecetas***',arrDiasRecetas)


        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },

    async getMyTracking (req, res){
        /*console.log(req.params.id)
        
        const id = req.params.id

        try {
            const tracking = await modeloSeguimiento.findAll({
                where:{
                    User_id: id
                }
            })
            console.log(tracking)
            res.json(JSON.stringify(tracking))
            
        } catch (error) {
            console.log(error)
        }*/
       
    },

    async getAllUsers (req, res){
        try {
            const queryMail ='SELECT * FROM usuarios' ;
            const result = await client.execute(queryMail);
            // Así se accede a los datos que trae:
            console.log(result.rows[0]);
            
            const resultado = result.rows[0];
            res.json(JSON.stringify(result.rows));


        } catch (err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }


    },

    async getUserTracking (req, res){
        
    },

    async getRecipes (req, res){
       try {
            console.log('getRecipes')
            const comida = await modeloComida.findAll();
            const desayuno = await modeloDesayuno.findAll();
            const cena = await modeloCena.findAll();
            const recetas = [desayuno, comida, cena]
            
            res.json(JSON.stringify(recetas))
        
       } catch (error) {
        console.error(error)
       }
    },

    async putComida (req, res){
        try {
            const comida = req.body
            console.log(comida)
            const newComida = await modeloComida.update(
                {   Titulo: comida.Titulo,
                    Ingredientes: comida.Ingredientes,
                    Preparacion: comida.Preparacion
                },
                {where:{
                    id: comida.id
                }}
            )
             res.json(newComida)

        } catch(error){
            console.error(error)
        }
        
    },
    async putCena (req, res){
        try {
            const cena = req.body
            console.log(cena)
            const newCena = await modeloCena.update(
                {   Titulo: cena.Titulo,
                    Ingredientes: cena.Ingredientes,
                    Preparacion: cena.Preparacion
                },
                {where:{
                    id: cena.id
                }}
            )
             res.json(newCena)

        } catch(error){
            console.error(error)
        }
       
    },

    async putDesayuno (req, res){
        try {
            const desayuno = req.body
            console.log(desayuno)
            const newDesayuno = await modeloDesayuno.update(
                {   Titulo: desayuno.Titulo,
                    Ingredientes: desayuno.Ingredientes,
                    Preparacion: desayuno.Preparacion
                },
                {where:{
                    id: desayuno.id
                }}
            )
             res.json(newDesayuno)

        } catch(error){
            console.error(error)
        }
    },

    async newRecipe(req, res){
        const dataRecipe = req.body
        let modelo;
        switch (dataRecipe.tipo){
            case 'desayuno': 
                modelo = modeloDesayuno;
                break;
            case 'comida':
                modelo = modeloComida;
                break;
            case 'cena':
                modelo = modeloCena;
                break;
        }
        try {
            console.log(modelo)
            const newRecipe = await modelo.create({
                Titulo: dataRecipe.Titulo,
                Ingredientes: dataRecipe.Ingredientes,
                Preparacion: dataRecipe.Preparacion
             });
             res.json(newRecipe)
            
        } catch (error) {
            console.log(error)
        }
    },

    async updateTracking(req, res){
        const tracking = req.body;
        console.log('tracking',tracking)
        const newtracking = await modeloSeguimiento.update(
            {
                Descripcion: tracking.Descripcion,
                Fecha: tracking.Fecha,
                Hora_de_la_Cita: tracking.Hora_de_la_Cita,
                Peso: tracking.Peso,
                Grasa_Corporal: tracking.Grasa
            },
            {where:{
                id: tracking.id
            }}
            )
            res.json(newtracking)        
    },

    async newTracking (req, res){
        const userId = req.params.id
        const tracking = req.body
        try {
            const newTracking = await modeloSeguimiento.create({
                Fecha: tracking.Fecha,
                Descripcion: tracking.Descripcion,
                Hora_de_la_Cita: tracking.Hora_de_la_Cita,
                User_id: userId
            })
            res.json(newTracking)


            
        } catch (error) {
            console.error(error)
        }

    },

    async getDiaries (req, res){
        try {
            const dia = await modeloDias.findAll();
            res.json(JSON.stringify(dia))

        } catch (error) {
            console.error(error)
        }
       

    }



}




module.exports = DietController;

