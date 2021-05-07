const db = require("../sequelize/models");
const bcrypt = require("bcrypt");

module.exports = {
    create: async function(user){
        try{
            user.userpassword = await bcrypt.hash(user.userpassword, 12); // 암호화 np
            user.userauthority = "ROLE_USER";
            user.userenabled = 1;
            const dbUser = await db.User.create(user);
            return dbUser;
        }catch(error){
            throw error;
        }
    }
};