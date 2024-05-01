const dotenv = require('dotenv');
const client = require('../../config/config'); // Importar la instacncia del cliente de la base de datos
dotenv.config();

const DietController = {
    // Crud Tabla de usuarios
    async getUserByMail(req, res) {
        const mail = req.user.email;
        //const mail ='marialopezmix@gmail.com'
        console.log('****MAIL***',mail);
        try {
            console.log('*****PASA****');
            const queryMail =`SELECT * FROM usuarios WHERE Correo = '${mail}'`;
            const result = await client.execute(queryMail);
            // Así se accede a los datos que trae:
            console.log(result.rows[0].id);
            
            const resultado = result.rows[0];
            console.log('!!!!!!!RESULTADO!!!!',resultado);
            res.json(JSON.stringify(resultado));


        } catch (err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async createNewUser(req, res){
        try {
            const dataUser = req.body;
            const now = new Date();
            const queryNewUser =`INSERT INTO usuarios (
                Nombre, Apellido, Contraseña, Rol_Usuario, Correo, Fecha_Registro, createdAt, updatedAt)
                VALUES ('${dataUser.Nombre}', '${dataUser.Apellido}','${dataUser.Contraseña}', '${dataUser.Rol_Usuario}',
                '${dataUser.Correo}', '${now}', '${now}', '${now}')`
            const newUser = await client.execute(queryNewUser);
            res.json(newUser);


        } catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async getAllUsers(req, res) {
        try{
            const queryAllUsers =`SELECT * FROM usuarios`
            const allUsers = await client.execute(queryAllUsers);
            res.json(JSON.stringify(allUsers.rows));

        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async putUser(req, res) {
        try {
            const putUser =req.body;
            const queryPutUser = `INSERT INTO usuarios (Nombre, Apellido, Contraseña, Rol_Usuario
                                Correo, Fecha_Registro, createdAt, updatedAr) VALUES (
                                    '${putUser.Nombre}', '${putUser.Apellido}','${putUser.Contraseña}', '${putUser.Rol_Usuario}',
                                    '${putUser.Correo}', '${now}', '${now}', '${now}')`
            const newPutUser = await client.execute(queryPutUser);
            res.json(newPutUser);
        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    // Crud dietary
    async alldietary(req, res) {
        console.log('*****ID=*****',req.params.id)
        const id = req.params.id;
        const planNombreId={};
        const planId =[];
        try {
            const queryPlan =`SELECT Plan_id, Nombre  FROM plans WHERE User_id= '${id}'`;
            const result = await client.execute(queryPlan);
            //console.log ('****REsult AllDietary*****', result)
            res.json(JSON.stringify(result.rows));           
            console.log('*****RESULT****', result.rows);

        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async getDietary(req, res) {
        console.log(req.params.id_plan);
       const plan_id=req.params.id_plan;
        
        try {
            const queryDesayunos =`SELECT * FROM desayunos WHERE Dias_id='${plan_id}'`;
            const desayuno = await client.execute(queryDesayunos);

            const queryComidas =`SELECT * FROM comidas WHERE Dias_id='${plan_id}'`;
            const comida = await client.execute(queryComidas);

            const queryCenas =`SELECT * FROM cenas WHERE Dias_id='${plan_id}'`;
            const cena = await client.execute(queryCenas);

            const recetas= [desayuno.rows, comida.rows, cena.rows];
            console.log('!!!!!RECETAS**GETDIETARY!!!!',recetas);
            res.json(JSON.stringify(recetas));
           
        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    //Crud Recipes
    // Crear Receta nueva Desayunos
    async newRecipe(req ,res) {
        const dataRecipe = req.body;
        console.log(dataRecipe);
        let tabla;
        switch(dataRecipe.tipo) {
            case 'desayuno':
                tabla = 'desayunos';
                break;
            case 'comida':
                tabla = 'comidas';
                break;
            case 'cena':
                tabla ='cenas';
                break;
        }
        try {
            console.log('!!!!TABLA!!!!!',tabla);
            const queryNewRecipe =`INSERT INTO '${tabla}'(
                Titulo, Ingredientes, Preparacion, createdAt, updatedAt) VALUES (
                '${dataRecipe.Titulo}','${dataRecipe.Ingredientes}', '${dataRecipe.Preparacion}','${now}',''${now}''
                )`;
                console.log('')
            const result = await client.execute(queryNewRecipe);
            res.json(JSON.stringify(result.rows));
            console.log('!!!!!RESULT!!!!',(JSON.stringify(result.rows)));

        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");
        } 
    
    },
    async getRecipes (req, res){
        try {
            const queryDesayunos ='SELECT * FROM desayunos' ;
            const desayuno = await client.execute(queryDesayunos);
            // Así se accede a los datos que trae:
            console.log(desayuno.rows);
            const queryComida ='SELECT * FROM comidas' ;
            const comida = await client.execute(queryComida);
            const queryCenas ='SELECT * FROM cenas' ;
            const cena = await client.execute(queryCenas);
            const recetas = [desayuno.rows, comida.rows, cena.rows]
            console.log('*****',recetas)
            res.json(JSON.stringify(recetas));
        } catch (err){
            console.error("Error al ejecutar la consulta:", err);
        }
     },
     async newTracking (req, res){
        try {
            const userId = req.params.id
            const tracking = req.body
            const now = new Date();
            const queryTracking = `INSERT INTO seguimientocita (Descripcion, Fecha, Hora_de_la_Cita, User_id, createdAt, updatedAt) VALUES (
                '${tracking.Descripcion}', '${tracking.Fecha}', '${tracking.Hora_de_la_Cita}', ${userId}, '${now}','${now}')`
            console.log('queryplan', queryTracking)
            const newtracking = await client.execute(queryTracking)
            res.json(newtracking)
    } catch (error) {
            console.log(error)
        }
    },

    async getUserTracking (req, res){
        const id = req.params.id
        const queryPlan =`SELECT * FROM seguimientocita WHERE User_id= '${id}'`;
        const result = await client.execute(queryPlan);
        res.json(JSON.stringify(result.rows))
     },
     async updateTracking(req, res){
        const tracking = req.body;
        console.log('tracking',tracking)
        queryPlan = `UPDATE seguimientocita SET Descripcion = '${tracking.Descripcion}',
        Fecha= '${tracking.Fecha}', Hora_de_la_Cita= '${tracking.Hora_de_la_Cita}', Peso=${tracking.Peso},
        Grasa_Corporal= ${tracking.Grasa} WHERE id=${tracking.id}`;
        console.log('queryplan', queryPlan)
        const newtracking = await client.execute(queryPlan)
        res.json(newtracking)
    },

}




/*
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
        
        //const tracking = {
        //    weight: [73.7, 75.2, 73.7, 72.3, 71.4, 70.3, 69.9, 69.6, 65.8, 66.4, 63.7, 63.9, 62.7, 62.4, 61.5],
        //    dates: ['12/05/2023', '23/05/2023', '30/05/2023', '20/06/2023', '27/06/2023', '04/07/2023', '18/07/2023', '08/09/2023', '19/10/2023', '16/11/2023', '14/12/2023', '17/01/2024', '14/02/2024', '13/03/2024', '10/04/2024']
        //}
        
        const id = req.params.id
        const queryPlan =`SELECT * FROM seguimientocita WHERE User_id= '${id}'`;
        const result = await client.execute(queryPlan);
        res.json(JSON.stringify(result.rows))
     },
 
     async updateTracking(req, res){
        try {
            const tracking = req.body;
                console.log('tracking',tracking)
                queryPlan = `UPDATE seguimientocita SET Descripcion = '${tracking.Descripcion}', 
                Fecha= '${tracking.Fecha}', Hora_de_la_Cita= '${tracking.Hora_de_la_Cita}', Peso=${tracking.Peso},
                Grasa_Corporal= ${tracking.Grasa} WHERE id=${tracking.id}`;
                console.log('queryplan', queryPlan)
                const newtracking = await client.execute(queryPlan)
                res.json(newtracking) 
            
        } catch (error) {
            console.log(error)
        }

            
    },

    async newTracking (req, res){
        try {
            const userId = req.params.id
            const tracking = req.body
            const now = new Date();
            const queryTracking = `INSERT INTO seguimientocita (Descripcion, Fecha, Hora_de_la_Cita, User_id, createdAt, updatedAt) VALUES (
                '${tracking.Descripcion}', '${tracking.Fecha}', '${tracking.Hora_de_la_Cita}', ${userId}, '${now}','${now}')`
            console.log('queryplan', queryTracking)
            const newtracking = await client.execute(queryTracking)
            res.json(newtracking)
        
    } catch (error) {
            console.log(error)
        }    
    },

    async getAgenda (req, res){

        try {
            const queryAgenda = `SELECT seguimientocita.id, seguimientocita.Fecha, seguimientocita.Hora_de_la_Cita, seguimientocita.Descripcion,
         usuarios.Nombre, usuarios.Apellido FROM seguimientocita JOIN usuarios ON usuarios.id = seguimientocita.User_id`
        const agenda = await client.execute(queryAgenda);
        res.json(JSON.stringify(agenda.rows))
            
        } catch (error) {
            console.log(error)
        }
        
 
    },

    async updateRecipe (req, res){
        try {
            const data = req.body;
            queryRecipe= `UPDATE ${data.Tabla} SET Titulo = '${data.Titulo}', Ingredientes= '${data.Ingredientes}',
                Preparacion= '${data.Preparacion}' WHERE id=${data.id}`
            const update = await client.execute(queryRecipe)
            res.json(update)

        } catch (error) {
            console.log(error)
        }        
    },

    async getDiaries (req, res){
        try {
            
            
        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = DietController;

