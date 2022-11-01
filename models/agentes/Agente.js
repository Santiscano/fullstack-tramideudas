const {Schema,model} = require('mongoose');
const AgenteSchema = Schema({
        
    name: {
        type: String,
        required: [true,'El name es obligatorio']
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria'],    
    }
});

const Agente = model('Agente',AgenteSchema);

module.exports = Agente