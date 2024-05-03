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
            const queryPlan =`SELECT Plan_id, Nombre  FROM plans WHERE User_id= '${id}'`;
            const result = await client.execute(queryPlan);
            
            res.json(JSON.stringify(result.rows));           
            
        }catch(err){
            console.error("Error al ejecutar la consulta:", err);
            res.status(500).send("Error interno del servidor");

        }
    },
    async getDietary(req, res) {
        
       const id_Plan=req.params.id;
        
        try {
            const queryDesayunos = `SELECT Titulo, Ingredientes, Preparacion 
                                    FROM desayunos JOIN plan_detalle_dias ON desayunos.id = plan_detalle_dias.Dias_id
                                    JOIN plans ON plan_detalle_dias.Plan_id = '${id_Plan}'`;
            const desayuno = await client.execute(queryDesayunos);

            const queryComidas =`SELECT Titulo, Ingredientes, Preparacion 
                                FROM comidas JOIN plan_detalle_dias ON comidas.id = plan_detalle_dias.Dias_id
                                JOIN plans ON plan_detalle_dias.Plan_id = '${id_Plan}'`;
            const comida = await client.execute(queryComidas);

            const queryCenas =`SELECT Titulo, Ingredientes, Preparacion 
                                FROM cenas JOIN plan_detalle_dias ON cenas.id = plan_detalle_dias.Dias_id
                                JOIN plans ON plan_detalle_dias.Plan_id = '${id_Plan}'`;
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
  async deleteDiary (req, res){
    //DELETE FROM desayunos WHERE id = [ID_DEL_REGISTRO];
    try {
        const diary = req.body;
        console.log('******ID******',diary.id);
        const queryDeleteDiary= `DELETE FROM dias WHERE id ='${diary.id}'`;
        const deleteDiary = await client.execute(queryDeleteDiary);
        res.json(deleteDiary);
        console.log('OK');
    }catch(err){
        console.error("Error al ejecutar la consulta:", err);
    }    
  },
  async deleteRecipe (req, res){
    try {
        const recipe =req.body;
        console.log('******ID******',recipe.id);
        const queryDeleteRecipe =`DELETE FROM '${recipe.Tabla}' WHERE id = '${recipe.id}'`;
        const deleteRecipe = await client.execute(queryDeleteRecipe);
        res.json(deleteRecipe);
        console.log('OK');
    }catch(err){
        console.error("Error al ejecutar la consulta:", err);
    }
  }

}


module.exports = DietController;

