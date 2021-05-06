const { response } = require("express");
const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

// 서비스 객체 
module.exports = {
    totalRows: async function(){
        try{
            const result = await db.Board.count();
            return result;
        }catch(error){
            throw error;
        }
    },
    list: async function(){
        try{
            const result = await db.Board.findAll({
                where : {
                    // bno >= 1 and bno <= 5 
                    bno: {[Op.between]: [1, 5]}
                }
            }); 
            return result;
        }catch(error){
            throw error;
        }
    }



};