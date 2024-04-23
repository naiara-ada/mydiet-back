const dotenv = require('dotenv');
dotenv.config();

const DietController = {
    
    async login(req, res){
         
        const mail = req.user.email
        mail === process.env.PROJECT_ID ?  res.redirect('/dashboard') : res.redirect('/user')
   
        
        
        

    },


}

module.exports = DietController;

