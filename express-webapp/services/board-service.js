const { response } = require("express");
const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

// 서비스 객체 
module.exports = {
    totalRows: async function(searchMethod){ // 주의: 자바스크립트는 변수가 있다고 해서 반드시 제공해야하는건 아님 그냥 파라미터 없이 호출해도 실행됨 
        try{
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "btitle"){ // 제목만 
                  where = {
                      "btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}                               
                    }
                } else{  // btitlecontent, 제목+내용 
                    where = {
                        [Op.or]: [
                            {"btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}},
                            {"bcontent": {[Op.like]: "%"+searchMethod.keyword+"%"}}
                        ]
                    }
                }
            }
            /* where을 count안에서 작성하지 않는이유는 
               조건이 제목만 고를때랑 제목+내용 일때랑 다르기 때문에 변수로 넣어준다. */
            const result = await db.Board.count({ where });
            return result;
            
        }catch(error){
            throw error;
        }
    },

    list: async function(pager, searchMethod){
        try{
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "btitle"){ // 제목만 
                  where = {
                      "btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}                               
                    }
                } else{  // btitlecontent, 제목+내용 
                    where = {
                        [Op.or]: [
                            {"btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}},
                            {"bcontent": {[Op.like]: "%"+searchMethod.keyword+"%"}}
                        ]
                    }
                }
            }
      
            const result = await db.Board.findAll({
                attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
                where,
                order: [["bno", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    rangeList: async function(startBno, endBno){
        try{
            const result = await db.Board.findAll({
                attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
                where: {
                    [Op.and]: [
                        {"bno": {[Op.gte]: startBno}}, 
                        {"bno": {[Op.lte]: endBno}}
                    ]
                } ,
                order: [["bno", "DESC"]],
            }); 
            return result;

        }catch(error){
            throw error;
        }
    },

    getBoard: async function(bno) {
        try{
            const result = await db.Board.findOne({
                where: {"bno": bno} // == {bno}
            });
            return result;
        }catch(error){
            throw error;
        }
    },

    create: async function(board){
        try{
            /*
                board와 dbBoard의 차이점은 bno의 생성 여부이다. 
            */
            const dbBoard = await db.Board.create(board);
            return dbBoard;
        }catch(error){
            throw error;
        }
    },

    update: async function(board){
        try{
            const rows = await db.Board.update({
                btitle: board.btitle,
                bcontent: board.bcontent
            }, {
                where: {bno: board.bno}
            });
            return rows;
        }catch(error){
            throw error;
        }
    },

    delete: async function(bno){
        try{
            const rows = await db.Board.destroy({where: {bno}})
        }catch(error){
            throw error;
        }
    },

    // user한명에 대한 정보와 user가 쓴 게시물 정보 다 가져옴. 즉, 2개의 테이블 정보 가져오기 
    getUserAndBoard: async function(userid){
        try{
            // 방법 1 
            // const user = await db.User.findOne({
            //     where: {userid},
            //     include: [{
            //         model: db.Board,
            //         where: {
            //             bno: {[Op.lte]: 5 }
            //         }
            //     }]
            // });

            // 방법2 
            const user = await db.User.findOne({
                where: {userid}
            });
            // user가 일반적인 자바스크립트 객체가 아니라서 dataValues 필요하다 
            user.dataValues.Boards = await user.getBoards({
                where: {
                    bno: {[Op.lte]: 5 }
                }
            });
            return user;
        }catch(error){
            throw error;
        }
    }

};