const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Board extends Model {
        static associate(models) { 
            /* 
                정적 메소드인 이유는 클래스 이름으로 막바로 메소드 호출해야 하니까. 
                매개변수로 models 받는 이유는 db를 넘겨주니까. 
            */
           // 다 대 일 
            models.Board.belongsTo(models.User, {foreignKey:"bwriter", targetKey:"userid"});
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Board.init({  // init(): Model이 가진 정적 메소드 
        bno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        btitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bcontent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bwriter: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        bhitcount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        battachoname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        battachsname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        battachtype: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "Board",
        tableName: "boards",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Board; // 모델 클래스 리턴    
};