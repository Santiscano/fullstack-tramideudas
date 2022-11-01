const mongoose = require('mongoose')



    const dbConnection = async() => {

        try {
            
            await mongoose.connect(process.env.MONGODB_CNN)
                
            console.log('conectado a la Base de datos!!!!!!!!!');
        } catch (error) {
            console.log(error);
            throw new Error('error a la hora de inicializar la db')
        }
    }

    module.exports = dbConnection