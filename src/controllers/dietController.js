const dotenv = require('dotenv');
const client = require('../../config/config'); // Importar la instacncia del cliente de la base de datos
dotenv.config();

const DietController = {
    // Crud Tabla de usuarios
    async getUserById(req, res){
        const id = req.params.id;
        try {
            const queryUserId = `SELECT Nombre, Apellido, Correo, Contraseña FROM usuarios WHERE id = '${id}'`;
            const result = await client.execute(queryUserId);
            res.json(JSON.stringify(result.rows));

        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");
        }
    },
    async getUserByMail(req, res) {
        const mail = req.user.email;
             
        try {
            const queryMail =`SELECT * FROM usuarios WHERE Correo = '${mail}'`;
            const result = await client.execute(queryMail);
            // Así se accede a los datos que trae:                       
            const resultado = result.rows[0];
            
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
    async updateUser(req, res) {
        const now = new Date();
        
        try {
            const putUser =req.body;
            console.log('!!!!ID DE ACTUALIZAR!!!!!!',putUser.id);
            const queryPutUser =`UPDATE usuarios SET Nombre='${putUser.Nombre}', Apellido='${putUser.Apellido}',
                                Correo='${putUser.Correo}', Contraseña='${putUser.Contraseña}',
                                Fecha_Registro='${now}', createdAt='${now}', updatedAt='${now}'
                                WHERE id='${putUser.id}'`;
            const newPutUser = await client.execute(queryPutUser);
            res.json(newPutUser);
        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    // Crud dietary
    async alldietary(req, res) {
        
        const id = req.params.id;
        const planNombreId={};
        const planId =[];
        try {
            const queryPlan =`SELECT id, Nombre  FROM plans WHERE User_id= '${id}'`;
            const result = await client.execute(queryPlan);
            
            res.json(JSON.stringify(result.rows));           
            
        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async getDietary(req, res) {
        
       const plan_id=req.params.id_plan;
        
        try {
            const queryDesayunos =`SELECT * FROM desayunos WHERE Dias_id='${plan_id}'`;
            const desayuno = await client.execute(queryDesayunos);

            const queryComidas =`SELECT * FROM comidas WHERE Dias_id='${plan_id}'`;
            const comida = await client.execute(queryComidas);

            const queryCenas =`SELECT * FROM cenas WHERE Dias_id='${plan_id}'`;
            const cena = await client.execute(queryCenas);

            const recetas= [desayuno.rows, comida.rows, cena.rows];
            
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
        const now = new Date();
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
               const queryNewRecipe =`INSERT INTO ${tabla} (
                Titulo, Ingredientes, Preparacion, createdAt, updatedAt) VALUES (
                '${dataRecipe.Titulo}','${dataRecipe.Ingredientes}', '${dataRecipe.Preparacion}','${now}','${now}'
                )`;
                
            const result = await client.execute(queryNewRecipe);
            res.json(JSON.stringify(result.rows));
            
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
            const queryComida ='SELECT * FROM comidas' ;
            const comida = await client.execute(queryComida);
            const queryCenas ='SELECT * FROM cenas' ;
            const cena = await client.execute(queryCenas);
            const recetas = [desayuno.rows, comida.rows, cena.rows]
            
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
            
            const newtracking = await client.execute(queryTracking);
            const queryLastID = `SELECT MAX(id) AS max_id FROM seguimientocita`;
            const resultlastID = await client.execute(queryLastID);
            const lastID = resultlastID.rows[0].max_id;
            console.log('lastID', lastID)

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
        console.log('tracking' , tracking)
        const queryPlan = `UPDATE seguimientocita SET Descripcion = '${tracking.Descripcion}',
        Fecha= '${tracking.Fecha}', Hora_de_la_Cita= '${tracking.Hora_de_la_Cita}', Peso=${tracking.Peso},
        Grasa_Corporal= ${tracking.Grasa} WHERE id=${tracking.id}`;
        
        const newtracking = await client.execute(queryPlan)
        res.json(newtracking)
    },

    async getAgenda (req, res){
         const queryAgenda = `SELECT seguimientocita.Fecha, seguimientocita.Hora_de_la_Cita, usuarios.Nombre,
         usuarios.Apellido FROM seguimientocita JOIN usuarios ON usuarios.id = seguimientocita.User_id `

         try {
            const agenda = await client.execute(queryAgenda)
            res.json(JSON.stringify(agenda.rows))
            
         } catch (error) {
            console.error(error)
         }



    },

    async getDiaries (req, res){
        try {
            const queryDiaries = `SELECT dias.id, dias.Nombre, dias.Fecha, dias.Desayuno_id, dias.Comida_id, dias.Cena_id FROM dias   `
            const diaries = await client.execute(queryDiaries)
            res.json(JSON.stringify(diaries.rows))
            
        } catch (error) {
            console.error(error)
        }
    },

    async updateRecipe (req, res){
        const recipe = req.body;
        const queryRecipe = `UPDATE ${recipe.Tabla} SET Titulo= '${recipe.Titulo}', Ingredientes='${recipe.Ingredientes}',
         Preparacion= '${recipe.Preparacion}' WHERE id =${recipe.id}`;
        try {
            const upRecipe = await client.execute(queryRecipe)
            res.json(upRecipe)
            
        } catch (error) {
            console.log(error)
        }
  },

  async updateDiary (req, res){
    const diary = req.body;
        const queryDiary = `UPDATE dias SET Nombre= '${diary.Nombre}', Desayuno_id=${diary.Desayuno_id},
        Comida_id=${diary.Comida_id}, Cena_id=${diary.Cena_id} WHERE id =${diary.id}`;
        try {
            const upDiary = await client.execute(queryDiary)
            res.json(upDiary)
            
        } catch (error) {
            console.log(error)
        }

  }, 

  async newDiary ( req, res){
    const now = new Date();
    try {
        const diary = req.body;
        const queryDiary = `INSERT INTO dias (Nombre, Fecha, Desayuno_id, Comida_id, Cena_id, createdAt, updatedAt )
            VALUES ('${diary.Nombre}', '${diary.Fecha}', ${diary.Desayuno_id}, ${diary.Comida_id}, ${diary.Cena_id},'${now}','${now}' )`
        const newDiary = await client.execute(queryDiary);
        res.json(newDiary)       
    } catch (error) {
        console.log(error)
    }
  },
  async newPlan (req, res){
    const now = new Date();
    const userId = req.params.id
    try {
        const plan = req.body;
        const queryPlan = `INSERT INTO plans (Nombre, Descripcion, Fecha, User_id,createdAt, updatedAt )
            VALUES ('${plan.Nombre}', '${plan.Descripcion}', '${plan.Fecha}', ${userId}, '${now}','${now}' )`;
        const newPlan = await client.execute(queryPlan);
        const queryLastID = `SELECT MAX (id) AS max_id FROM plans`;
        const resultlastID = await client.execute(queryLastID);
        const lastID = resultlastID.rows[0].max_id;
        
        const diaValues = plan.dias.map((dia, index) => `(${lastID}, ${parseInt(dia)}, '${index +1}', '${now}', '${now}')`).join(',');
        
        const queryDia = `INSERT INTO plan_detalle_dias (Plan_id, Dias_id, Dia_Semana, createdAt, updatedAt)
                VALUES ${diaValues}`;
         
            const resulDetalle =   await client.execute(queryDia);       
        res.json(newPlan)     
    } catch (error) {
        console.log(error)
    }

  },

  async getPlanByID (req, res){
    const {id, id_plan} = req.params
    console.log('id', id);
    console.log('id_plan', id_plan);

    const queryDetalle = `SELECT plans.Fecha, plans.Nombre AS nombrePlan, plans.Descripcion, dias.id, dias.Nombre AS nombreDias
      FROM plans 
      JOIN plan_detalle_dias ON plan_detalle_dias.Plan_id = plans.id 
      JOIN dias ON dias.id = plan_detalle_dias.Dias_id WHERE plans.id = ${id_plan}`
    const detalleplan = await client.execute(queryDetalle);
    res.json(JSON.stringify(detalleplan.rows))
  },
  
  async updatePlan (req, res){
    try {
        const dataPlan = req.body;
        console.log('dataPlan**', dataPlan)
        const queryPlan = `UPDATE plans SET Nombre= '${dataPlan.Nombre}', Descripcion= '${dataPlan.Descripcion}', Fecha= '${dataPlan.Fecha}' WHERE id= ${parseInt(dataPlan.id)} `;
        const upPlan = await client.execute(queryPlan);
        const queryDetalle0 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[0])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 1`;
        const updetalle = await client.execute(queryDetalle0);
        const queryDetalle1 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[1])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 2`;
        const updetalle1 = await client.execute(queryDetalle1);
        const queryDetalle2 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[2])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 3`;
        const updetalle2 = await client.execute(queryDetalle2);
        const queryDetalle3 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[3])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 4`;
        const updetalle3 = await client.execute(queryDetalle3);
        const queryDetalle4 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[4])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 5`;
        const updetalle4 = await client.execute(queryDetalle4);
        const queryDetalle5 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[5])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 6`;
        const updetalle5 = await client.execute(queryDetalle5);
        const queryDetalle6 = `UPDATE plan_detalle_dias SET Dias_id = ${parseInt(dataPlan.dias[6])} WHERE Plan_id = ${parseInt(dataPlan.id)} AND Dia_Semana = 7`;
        const updetalle6 = await client.execute(queryDetalle6);
        
        res.json(upPlan)

    } catch (error) {
        console.log(error)
    }
    
    
  }

}


module.exports = DietController;

