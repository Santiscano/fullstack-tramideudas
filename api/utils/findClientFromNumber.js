const Client = require("../models/Client")

const findClientFromNumber = async(number) => {

   return await Client.findOne({"telephone.number": number})
      
}
module.exports = {
    findClientFromNumber
}